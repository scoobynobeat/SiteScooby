import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    return () => {
      lenis.destroy();
    };
  }, []);
  return children;
};
