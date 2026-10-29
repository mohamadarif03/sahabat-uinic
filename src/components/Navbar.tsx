"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 lg:px-12 pt-4 md:pt-6 flex justify-center pointer-events-none">
      <header 
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled 
            ? 'w-full max-w-5xl bg-[#0D4A38]/85 backdrop-blur-xl shadow-xl py-3 px-6 md:px-8 rounded-full border border-white/20' 
            : 'w-full max-w-full bg-transparent py-2 px-2 md:px-4'
        }`}
      >
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="SAHABAT Logo" 
            className="h-12 md:h-16 object-contain drop-shadow-sm transition-transform group-hover:scale-105"
          />
          <span className="font-sans font-bold text-xl md:text-2xl tracking-widest text-[#FFFDF8] drop-shadow-sm uppercase">
            SAHABAT
          </span>
        </Link>
        
        {/* Right: Nav Links + Button */}
        <div className="flex items-center gap-8 md:gap-10">
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-sans font-medium text-[#FFFDF8] drop-shadow-sm">
            <a href="#fitur" className="hover:text-[#86EFAC] transition-colors">Fitur</a>
            <a href="#cara-kerja" className="hover:text-[#86EFAC] transition-colors">Cara Kerja</a>
            <a href="#testimoni" className="hover:text-[#86EFAC] transition-colors">Testimoni</a>
          </nav>

          <Link
            href="/dashboard"
            className="px-6 py-2.5 font-sans font-bold text-[14px] rounded-full transition-all duration-300 shadow-lg flex items-center gap-2 bg-[#FFFDF8] text-[#15803D] hover:bg-white hover:scale-105"
          >
            Mulai Belajar
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </header>
    </div>
  );
}
