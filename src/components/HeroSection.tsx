"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type AccessMode = "voice" | "gesture" | "writing" | "dyslexia";

interface ModeDetail {
  id: AccessMode;
  label: string;
  badge: string;
  title: string;
  arabicText: string;
  transliteration: string;
  translation: string;
  featureTitle: string;
  featureDesc: string;
  metricLabel: string;
  metricValue: string;
  accentColor: string;
}

const MODES: Record<AccessMode, ModeDetail> = {
  voice: {
    id: "voice",
    label: "Tunanetra (Voice AI)",
    badge: "Voice Recognition Active",
    title: "Surah Al-Fatihah: 1",
    arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    transliteration: "Bismillāhir-raḥmānir-raḥīm",
    translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
    featureTitle: "Koreksi Hafalan & Tajwid Real-Time",
    featureDesc: "AI mendengarkan lantunan ayat dan menganalisis makhraj serta panjang mad secara instan.",
    metricLabel: "Akurasi Tajwid AI",
    metricValue: "98.4%",
    accentColor: "#15803D",
  },
  gesture: {
    id: "gesture",
    label: "Tunarungu (Isyarat AI)",
    badge: "Gesture Tracking Active",
    title: "Huruf Hijaiyah: Ba (ب)",
    arabicText: "بَ - بِ - بُ",
    transliteration: "Ba - Bi - Bu",
    translation: "Pengenalan huruf melalui isyarat tangan berstandar ABATA.",
    featureTitle: "Deteksi Gerakan Tangan AI",
    featureDesc: "Kamera mendeteksi 21 titik sendi jari untuk memvalidasi isyarat hijaiyah secara presisi.",
    metricLabel: "Ketepatan Gestur",
    metricValue: "97.1%",
    accentColor: "#16A34A",
  },
  writing: {
    id: "writing",
    label: "Tunawicara (Kaligrafi)",
    badge: "Handwriting Analysis",
    title: "Goresan Kaligrafi Huruf",
    arabicText: "ج - ح - خ",
    transliteration: "Jim - Kha - Kho",
    translation: "Latihan motorik menulis ayat dengan evaluasi kelengkapan titik & harakat.",
    featureTitle: "Analisis Tulisan Tangan AI",
    featureDesc: "Canvas interaktif memandu goresan kaligrafi dan memberikan umpan balik kelengkapan kurva.",
    metricLabel: "Presisi Garis",
    metricValue: "95.8%",
    accentColor: "#22C55E",
  },
  dyslexia: {
    id: "dyslexia",
    label: "Ramah Disleksia",
    badge: "High-Contrast Typography",
    title: "Format Khusus Disleksia",
    arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    transliteration: "Al-ḥamdu lillāhi rabbil-'ālamīn",
    translation: "Segala puji bagi Allah, Tuhan seluruh alam.",
    featureTitle: "Huruf Berjarak & Berwarna Khusus",
    featureDesc: "Font berbobot bawah dengan spasi kata lega mencegah huruf tertukar saat dibaca.",
    metricLabel: "Tingkat Keterbacaan",
    metricValue: "99.2%",
    accentColor: "#F59E0B",
  },
};

export default function HeroSection() {
  const [activeMode, setActiveMode] = useState<AccessMode>("voice");
  const currentMode = MODES[activeMode];

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-[#06281E] via-[#0D4A38] to-[#15803D] text-[#FFFDF8] pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden flex flex-col justify-center items-center">
      {/* Decorative Islamic Geometric Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.4) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.4) 2%, transparent 0%)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Radiant Centered Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#22C55E]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#86EFAC]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#15803D]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main Single Centered Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">

        {/* Main Centered Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-8 uppercase"
        >
          Belajar Lebih{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#86EFAC] via-[#D1FAE5] to-[#FFFDF8]">
            Inklusif
          </span>{" "}
          <br />
          Bersama SAHABAT
        </motion.h1>

        {/* Centered Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-[#FFFDF8]/90 leading-relaxed font-normal max-w-2xl mx-auto mb-10"
        >
          Setiap insan berhak merasakan keindahan kalam suci Al-Qur'an tanpa batasan.
          SAHABAT menghadirkan bimbingan tilawah mandiri berbasis AI dengan koreksi suara cerdas,
          bahasa isyarat interaktif, evaluasi kaligrafi, dan antarmuka ramah disleksia.
        </motion.p>

        {/* Centered CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14"
        >
          <Link
            href="/dashboard"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FFFDF8] hover:bg-white text-[#0D4A38] font-black text-sm uppercase tracking-wider shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Mulai Belajar Sekarang</span>
            <div className="w-7 h-7 rounded-full bg-[#15803D]/15 flex items-center justify-center group-hover:bg-[#15803D]/25 transition-colors">
              <svg className="w-4 h-4 text-[#0D4A38] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>

          <a
            href="#fitur"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-[#FFFDF8] font-bold text-sm tracking-wide border border-white/25 backdrop-blur-md transition-all duration-200"
          >
            <span>Jelajahi Fitur</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>

        {/* Interactive Mode Sandbox - Centered Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative text-left"
        >
          {/* Header inside Card */}
          <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-white/80 ml-2">Simulasi Interaktif Aksesibilitas</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-semibold tracking-wide text-[#86EFAC]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#86EFAC] animate-ping" />
              Live AI
            </div>
          </div>

          {/* Mode Selector Tabs (Centered Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 bg-black/20 p-1.5 rounded-2xl border border-white/10">
            {(Object.keys(MODES) as AccessMode[]).map((modeKey) => {
              const mode = MODES[modeKey];
              const isSelected = activeMode === modeKey;
              return (
                <button
                  key={modeKey}
                  onClick={() => setActiveMode(modeKey)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 text-center flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-[#FFFDF8] text-[#0D4A38] shadow-md"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  <span className="truncate">{mode.label.split(" ")[0]}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Mode Animated Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Surah / Material Display Box */}
              <div className="bg-[#FFFDF8] text-[#111827] rounded-2xl p-5 sm:p-6 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-bold text-[#15803D] uppercase tracking-wider">
                    {currentMode.title}
                  </span>
                  <span className="bg-[#15803D]/10 text-[#15803D] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                    {currentMode.badge}
                  </span>
                </div>

                {/* Arabic Text */}
                <div 
                  className={`text-right font-serif text-2xl sm:text-3xl text-gray-900 leading-loose py-2 ${
                    activeMode === "dyslexia" ? "tracking-widest" : ""
                  }`}
                  dir="rtl"
                >
                  {currentMode.arabicText}
                </div>

                {/* Transliteration */}
                <div className="text-sm font-semibold text-[#15803D] italic mb-1">
                  {currentMode.transliteration}
                </div>

                {/* Translation */}
                <div className="text-xs text-gray-600 leading-relaxed">
                  {currentMode.translation}
                </div>

                {/* Interactive Waveform / Landmark indicator */}
                {activeMode === "voice" && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 h-5">
                      {[30, 80, 50, 100, 70, 90, 40, 85, 60, 30].map((h, i) => (
                        <motion.span
                          key={i}
                          className="w-1 bg-[#15803D] rounded-full"
                          animate={{ height: [`${Math.max(20, h * 0.3)}%`, `${h}%`, `${Math.max(20, h * 0.2)}%`] }}
                          transition={{ repeat: Infinity, duration: 0.7 + i * 0.08, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-[#15803D] flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
                      </svg>
                      Voice AI Aktif
                    </span>
                  </div>
                )}

                {activeMode === "gesture" && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-mono">21 Joint Points Tracked</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                      Gestur Valid
                    </span>
                  </div>
                )}

                {activeMode === "writing" && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-mono">Stroke curvature detected</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                      Kaligrafi Sesuai
                    </span>
                  </div>
                )}

                {activeMode === "dyslexia" && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500">Mode Kontras Tinggi</span>
                    <span className="text-[#15803D] font-bold">Dyslexia Optimized</span>
                  </div>
                )}
              </div>

              {/* Metric Row inside Card */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/75 font-medium">{currentMode.metricLabel}</div>
                  <div className="text-xs text-white/95 mt-0.5 line-clamp-1">{currentMode.featureTitle}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-[#86EFAC] font-mono">{currentMode.metricValue}</div>
                  <div className="text-[10px] text-[#4ADE80] font-bold uppercase tracking-wider">Akurasi AI</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Link inside Card */}
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
            <span className="text-xs text-white/70">Ingin latihan langsung sekarang?</span>
            <Link
              href="/dashboard"
              className="text-xs font-bold text-[#86EFAC] hover:text-white flex items-center gap-1 transition-colors"
            >
              Buka Modul Belajar
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Centered Key Value Metrics Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-white/15 w-full max-w-2xl mt-12 text-center"
        >
          <div>
            <div className="text-3xl font-black text-[#FFFDF8]">4 Mode</div>
            <div className="text-xs text-[#FFFDF8]/75 font-medium mt-1">Aksesibilitas Lengkap</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#86EFAC]">3 Model</div>
            <div className="text-xs text-[#FFFDF8]/75 font-medium mt-1">AI Pengenal Aktif</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#FFFDF8]">114</div>
            <div className="text-xs text-[#FFFDF8]/75 font-medium mt-1">Surah Terverifikasi</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#A7F3D0]">100%</div>
            <div className="text-xs text-[#FFFDF8]/75 font-medium mt-1">Gratis & Inklusif</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
