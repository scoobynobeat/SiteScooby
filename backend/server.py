from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from starlette.middleware.cors import CORSMiddleware

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

app = FastAPI()
api = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

JWT_ALGORITHM = "HS256"


# ---------- Models ----------
DEFAULT_MARQUEE = ["Cachorro na voz", "Arrochadeira", "Paredão", "No Beat", "Joga Pro Cachorro", "Scooby no Beat"]


class Socials(BaseModel):
    spotify: str = ""
    instagram: str = ""
    youtube: str = ""
    tiktok: str = ""
    whatsapp: str = ""


class Profile(BaseModel):
    name: str
    handle: str
    tagline: str = ""
    bio: str = ""
    listeners: str = ""
    avatar: str = ""
    spotify_artist_id: str = ""
    whatsapp_message: str = ""
    booking_label: str = "Contratar show"
    booking_url: str = ""
    socials: Socials = Field(default_factory=Socials)
    marquee_words: List[str] = Field(default_factory=lambda: list(DEFAULT_MARQUEE))


class LinkItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    subtitle: str = ""
    url: str
    image: str = ""
    icon: str = "link"


class ShowItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: str
    city: str
    venue: str = ""
    ticket_url: str = ""


class Page(BaseModel):
    profile: Profile
    links: List[LinkItem]
    shows: List[ShowItem] = Field(default_factory=list)
    updated_at: Optional[str] = None


class LoginBody(BaseModel):
    email: str
    password: str


DEFAULT_PAGE = Page(
    profile=Profile(
        name="Scooby no Beat",
        handle="@scoobynobeat",
        tagline="Cachorro na voz",
        bio="Arrochadeira, funk e paredão. O som que faz o carro tremer.",
        listeners="116,5 mil",
        avatar="/artist.jpg",
        spotify_artist_id="7A3PnERPZhRjBkdoWKzc7H",
        whatsapp_message="Olá Scooby! Quero contratar um show.",
        socials=Socials(
            spotify="https://open.spotify.com/artist/7A3PnERPZhRjBkdoWKzc7H",
            instagram="https://www.instagram.com/scoobynobeat",
            youtube="https://www.youtube.com/@scoobynobeat",
            tiktok="https://www.tiktok.com/@scoobynobeat",
            whatsapp="https://wa.me/5500000000000",
        ),
    ),
    links=[
        LinkItem(title="Dia de Revoada", subtitle="Lançamento • Ouça agora no Spotify", url="https://open.spotify.com/album/3wqwvczpjhixMYHBXynIsY", image="/cover_5d8514e265b55540d7fd1912.jpg", icon="spotify"),
        LinkItem(title="Instagram", subtitle="Bastidores, shows e novidades", url="https://www.instagram.com/scoobynobeat", image="/artist.jpg", icon="instagram"),
        LinkItem(title="TikTok", subtitle="As trends do paredão", url="https://www.tiktok.com/@scoobynobeat", image="/cover_4f70579dc81f13a09f5e3e8c.jpg", icon="tiktok"),
        LinkItem(title="YouTube", subtitle="Clipes e visualizers", url="https://www.youtube.com/@scoobynobeat", image="/cover_357e0e0d3751687f49399159.jpg", icon="youtube"),
        LinkItem(title="Contrate para shows", subtitle="Fale direto no WhatsApp", url="https://wa.me/5500000000000", image="/cover_3afbbbd197f4702afde49509.jpg", icon="whatsapp"),
    ],
)


# ---------- Auth helpers ----------
def hash_password(p: str) -> str:
    return bcrypt.hashpw(p.encode(), bcrypt.gensalt()).decode()


def verify_password(p: str, h: str) -> bool:
    return bcrypt.checkpw(p.encode(), h.encode())


def make_token(user_id: str, email: str, kind: str, delta: timedelta) -> str:
    payload = {"sub": user_id, "email": email, "type": kind, "exp": datetime.now(timezone.utc) + delta}
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, user_id: str, email: str):
    access = make_token(user_id, email, "access", timedelta(hours=12))
    refresh = make_token(user_id, email, "refresh", timedelta(days=7))
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none", max_age=43200, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    auth = request.headers.get("Authorization", "")
    if not token and auth.startswith("Bearer "):
        token = auth[7:]
    if not token:
        raise HTTPException(401, "Não autenticado")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Sessão expirada")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Token inválido")
    if payload.get("type") != "access":
        raise HTTPException(401, "Token inválido")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])}, {"password_hash": 0})
    if not user:
        raise HTTPException(401, "Usuário não encontrado")
    return {"id": str(user["_id"]), "email": user["email"], "role": user.get("role", "admin")}


# ---------- Auth routes ----------
@api.post("/auth/login")
async def login(body: LoginBody, request: Request, response: Response):
    email = body.email.strip().lower()
    ident = f"{request.client.host if request.client else 'x'}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": ident})
    now = datetime.now(timezone.utc)
    if attempt and attempt.get("locked_until") and attempt["locked_until"].replace(tzinfo=timezone.utc) > now:
        raise HTTPException(429, "Muitas tentativas. Tente novamente em 15 minutos.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        count = (attempt or {}).get("count", 0) + 1
        update = {"identifier": ident, "count": count}
        if count >= 5:
            update = {"identifier": ident, "count": 0, "locked_until": now + timedelta(minutes=15)}
        await db.login_attempts.update_one({"identifier": ident}, {"$set": update}, upsert=True)
        raise HTTPException(401, "Usuário ou senha incorretos")
    await db.login_attempts.delete_many({"identifier": ident})
    set_auth_cookies(response, str(user["_id"]), email)
    return {"id": str(user["_id"]), "email": email, "role": user.get("role", "admin")}


@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/", secure=True, samesite="none")
    response.delete_cookie("refresh_token", path="/", secure=True, samesite="none")
    return {"ok": True}


# ---------- Page routes ----------
@api.get("/")
async def root():
    return {"message": "Scooby no Beat API"}


@api.get("/page", response_model=Page)
async def get_page():
    doc = await db.page.find_one({"key": "main"}, {"_id": 0, "key": 0})
    return Page(**doc) if doc else DEFAULT_PAGE


@api.put("/page", response_model=Page)
async def update_page(page: Page, _: dict = Depends(get_current_user)):
    page.updated_at = datetime.now(timezone.utc).isoformat()
    await db.page.update_one({"key": "main"}, {"$set": {**page.model_dump(), "key": "main"}}, upsert=True)
    return page


@api.post("/page/reset", response_model=Page)
async def reset_page(_: dict = Depends(get_current_user)):
    await db.page.update_one({"key": "main"}, {"$set": {**DEFAULT_PAGE.model_dump(), "key": "main"}}, upsert=True)
    return DEFAULT_PAGE


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ["FRONTEND_URL"], "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    email = os.environ["ADMIN_EMAIL"].lower()
    pwd = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": email})
    if existing is None:
        await db.users.insert_one({"email": email, "password_hash": hash_password(pwd), "role": "admin", "created_at": datetime.now(timezone.utc)})
    elif not verify_password(pwd, existing["password_hash"]):
        await db.users.update_one({"email": email}, {"$set": {"password_hash": hash_password(pwd)}})
    if not await db.page.find_one({"key": "main"}):
        await db.page.insert_one({**DEFAULT_PAGE.model_dump(), "key": "main"})


@app.on_event("shutdown")
async def shutdown():
    client.close()
