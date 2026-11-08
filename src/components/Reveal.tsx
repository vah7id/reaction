"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Adds the .in class to .rv elements as they scroll into view; also toggles the nav border. */
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".rv:not(.in)").forEach((e) => io.observe(e));
    const nav = document.querySelector(".nav");
    const f = () => nav?.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => { io.disconnect(); window.removeEventListener("scroll", f); };
  }, [path]);
  return null;
}
