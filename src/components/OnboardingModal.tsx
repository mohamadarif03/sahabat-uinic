"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedMode = localStorage.getItem("accessibility_mode");
    if (savedMode) {
      return;
    }

    // Otherwise, show popup after a brief delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      
      // Trigger voice guidance (Initial Greeting)
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        
        const textToSpeak = "Selamat datang di SAHABAT. Bantu aku mengenalmu! Pilih kondisimu agar aku bisa menyesuaikan tampilan dan fitur aplikasi ini menjadi yang terbaik untukmu. Gunakan tombol Tab di keyboard untuk bernavigasi dan Enter untuk memilih.";
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = "id-ID";
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    }, 500);
    
    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelect = (mode: string) => {
    localStorage.setItem("accessibility_mode", mode);
    
    // Announce the selected mode
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const messages: Record<string, string> = {
        tunanetra: "Mode Tuna Netra aktif. Pengalaman audio diprioritaskan.",
        tunarungu: "Mode Tuna Rungu aktif. Pengalaman visual dan isyarat diprioritaskan.",
        reguler: "Mode reguler aktif. Selamat belajar!"
      };
      const utterance = new SpeechSynthesisUtterance(messages[mode] || "Pilihan tersimpan.");
      utterance.lang = "id-ID";
      window.speechSynthesis.speak(utterance);
    }

    setIsOpen(false);
  };

  const speakOption = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button for mouse users */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Tutup dialog"
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            {/* Left Side: Decorative Graphic */}
            <div className="hidden md:flex w-[40%] relative overflow-hidden bg-[#15803D]">
              <img src="/popup.png" alt="Popup Background" className="absolute inset-0 w-full h-full object-cover object-left opacity-90" />
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
              
              <div className="inline-block border-2 border-[#15803D] rounded-full px-6 py-2 mb-6 self-start">
                <h2 id="modal-title" className="font-sans font-black text-xl md:text-2xl text-gray-800 tracking-tight text-center uppercase">
                  Bantu aku mengenalmu!
                </h2>
              </div>
              
              <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed mb-4">
                Pilih kondisimu agar aku bisa menyesuaikan tampilan dan fitur aplikasi ini menjadi yang terbaik untukmu.
              </p>
              
              <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold px-4 py-3 rounded-xl mb-8 flex items-start gap-3">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#15803D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Gunakan tombol <kbd className="bg-white px-1.5 py-0.5 rounded border border-emerald-300 shadow-sm mx-1">Tab</kbd> di keyboard untuk bernavigasi dan <kbd className="bg-white px-1.5 py-0.5 rounded border border-emerald-300 shadow-sm mx-1">Enter</kbd> untuk memilih.</span>
              </div>

              {/* Options List */}
              <div className="flex flex-col gap-4">
                
                {/* Option 1: Tuna Netra */}
                <button 
                  onClick={() => handleSelect("tunanetra")}
                  onFocus={() => speakOption("Pilihan 1: Tuna Netra. Panduan suara penuh.")}
                  className="flex items-center gap-5 p-4 rounded-[20px] border-2 border-transparent hover:border-[#15803D]/30 focus:border-[#15803D] focus:outline-none focus:ring-4 focus:ring-[#15803D]/20 hover:bg-[#15803D]/5 transition-all group text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white"
                >
                  <div className="w-14 h-14 rounded-full bg-[#15803D]/10 text-[#15803D] flex-shrink-0 flex items-center justify-center group-hover:scale-110 group-focus:scale-110 transition-transform">
                    {/* Icon Person with Cane */}
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 4a2 2 0 100-4 2 2 0 000 4zM6 21a1 1 0 001.447.894l4-2A1 1 0 0012 19v-4.586l1.293 1.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0L7 13.586V19a1 1 0 00.553.894l1.447.724zM16.293 8.293L13 5H9.5A1.5 1.5 0 008 6.5V11a1 1 0 002 0V8.414l1.293 1.293a1 1 0 001.414 0l3.586-3.586a1 1 0 00-1.414-1.414L13.586 6.293 16.293 9h-.001z"/>
                      <path d="M21 16l-3-6-1.5 3 2.5 5A1 1 0 0021 16z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg text-gray-800 mb-1">Tuna Netra</h3>
                    <p className="font-sans text-[13px] text-gray-500">Panduan suara & Screen Reader penuh</p>
                  </div>
                </button>

                {/* Option 2: Tuna Rungu */}
                <button 
                  onClick={() => handleSelect("tunarungu")}
                  onFocus={() => speakOption("Pilihan 2: Tuna Rungu atau Wicara. Panduan visual tajam.")}
                  className="flex items-center gap-5 p-4 rounded-[20px] border-2 border-transparent hover:border-[#15803D]/30 focus:border-[#15803D] focus:outline-none focus:ring-4 focus:ring-[#15803D]/20 hover:bg-[#15803D]/5 transition-all group text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white"
                >
                  <div className="w-14 h-14 rounded-full bg-[#15803D]/10 text-[#15803D] flex-shrink-0 flex items-center justify-center group-hover:scale-110 group-focus:scale-110 transition-transform">
                    {/* Icon Sign Language / Hand */}
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.441 5.419L11 4 9.559 5.419C8.307 6.657 8.307 8.657 9.559 9.894L11 11.314l1.441-1.42c1.252-1.237 1.252-3.237 0-4.475z"/>
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2h3.5l1.64 3.28a1 1 0 00.895.553h5.93a1 1 0 00.895-.553L19.5 13H23a2 2 0 01-2 2z"/>
                      <path d="M6 9a2 2 0 00-2 2v2h4l-2.5-5H6z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg text-gray-800 mb-1">Tuna Rungu/Wicara</h3>
                    <p className="font-sans text-[13px] text-gray-500">Panduan visual tajam & gestur isyarat</p>
                  </div>
                </button>

                {/* Option 3: Reguler */}
                <button 
                  onClick={() => handleSelect("reguler")}
                  onFocus={() => speakOption("Pilihan 3: Reguler atau Normal. Pengalaman belajar standar.")}
                  className="flex items-center gap-5 p-4 rounded-[20px] border-2 border-transparent hover:border-[#15803D]/30 focus:border-[#15803D] focus:outline-none focus:ring-4 focus:ring-[#15803D]/20 hover:bg-[#15803D]/5 transition-all group text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white"
                >
                  <div className="w-14 h-14 rounded-full bg-[#15803D]/10 text-[#15803D] flex-shrink-0 flex items-center justify-center group-hover:scale-110 group-focus:scale-110 transition-transform">
                    {/* Icon Normal / Face */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg text-gray-800 mb-1">Reguler (Normal)</h3>
                    <p className="font-sans text-[13px] text-gray-500">Pengalaman belajar standar</p>
                  </div>
                </button>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
