export const LogoMark = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <rect width="64" height="64" rx="16" fill="#0A0A0D" stroke="rgba(245,197,24,.35)" />
    <path d="M12 22 L18 6 L26 18 Z M52 22 L46 6 L38 18 Z" fill="#F5C518" />
    <g fill="#F5C518">
      <rect className="eq-bar" style={{ animationDelay: "0s" }} x="13" y="30" width="5" height="16" rx="2.5" />
      <rect className="eq-bar" style={{ animationDelay: ".2s" }} x="22" y="22" width="5" height="32" rx="2.5" />
      <rect className="eq-bar" style={{ animationDelay: ".4s" }} x="31" y="16" width="5" height="40" rx="2.5" />
      <rect className="eq-bar" style={{ animationDelay: ".1s" }} x="40" y="24" width="5" height="28" rx="2.5" />
      <rect className="eq-bar" style={{ animationDelay: ".3s" }} x="49" y="32" width="5" height="12" rx="2.5" />
    </g>
  </svg>
);
