'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Check if dismissed previously (within last 3 days)
    const dismissedAt = localStorage.getItem('pwa_prompt_dismissed');
    if (dismissedAt) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 3) {
        return;
      }
    }

    // Check for iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Listen for beforeinstallprompt (Android / Chrome / Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait 3 seconds before showing prompt to not interrupt initial experience
      setTimeout(() => {
        setShowPrompt(true);
        setTimeout(() => setIsVisible(true), 50);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // For iOS, show after delay if not already installed
    if (isIOSDevice && !isStandalone) {
      setTimeout(() => {
        setShowPrompt(true);
        setTimeout(() => setIsVisible(true), 50);
      }, 4000);
    }

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.setItem('pwa_installed', 'true');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, [isStandalone]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowPrompt(false);
      localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
    }, 300);
  };

  // Don't render if already installed or prompt not triggered
  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleDismiss}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Modal / Bottom Sheet */}
      <div
        className={`fixed z-50 bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md w-full transition-all duration-300 ease-out transform ${
          isVisible
            ? 'opacity-100 translate-y-0 md:scale-100'
            : 'opacity-0 translate-y-8 md:scale-95'
        }`}
      >
        <div className="bg-[#FFFDF8] rounded-t-3xl md:rounded-3xl shadow-2xl border border-[#15803D]/10 overflow-hidden relative">
          {/* Header gradient strip */}
          <div className="h-1 bg-gradient-to-r from-[#14532D] via-[#15803D] to-[#86EFAC]" />

          {/* Close Button (X) */}
          <button
            onClick={handleDismiss}
            aria-label="Tutup"
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6 md:p-8">
            {/* Logo + Title */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#15803D] flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
                <Image src="/logo.png" alt="SAHABAT" width={56} height={56} className="object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#111827] font-sans uppercase tracking-tight leading-none">
                  SAHABAT
                </h2>
                <p className="text-sm text-[#15803D] font-medium mt-0.5">Belajar Al-Qur&apos;an Lebih Mudah</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
              Install SAHABAT sebagai aplikasi di perangkatmu untuk akses yang lebih cepat, pengalaman layar penuh, dan bisa digunakan kapan saja.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: '⚡', label: 'Lebih Cepat' },
                { icon: '📱', label: 'Layar Penuh' },
                { icon: '🔖', label: 'Mudah Diakses' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 bg-[#15803D]/5 rounded-xl py-3 px-2"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[11px] font-semibold text-[#15803D] text-center leading-tight">{item.label}</span>
                </div>
              ))}
            </div>

            {/* iOS Instructions */}
            {isIOS && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-5">
                <p className="text-[13px] font-bold text-emerald-900 mb-2">Cara Install di iPhone / iPad:</p>
                <ol className="space-y-1.5">
                  {[
                    <>Tap ikon <strong>Bagikan</strong> (□↑) di browser Safari</>,
                    <>Scroll ke bawah, pilih <strong>&ldquo;Tambahkan ke Layar Utama&rdquo;</strong></>,
                    <>Tap <strong>Tambahkan</strong> di pojok kanan atas</>,
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-emerald-800">
                      <span className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isIOS && (
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-[#15803D] text-white font-bold text-[14px] py-3.5 rounded-xl hover:bg-[#166534] active:scale-[0.98] transition-all duration-150 shadow-md"
                >
                  Install Sekarang
                </button>
              )}
              <button
                onClick={handleDismiss}
                className={`font-semibold text-[14px] py-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all duration-150 text-gray-500 ${
                  isIOS ? 'flex-1' : 'px-5'
                }`}
              >
                {isIOS ? 'Mengerti' : 'Nanti'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
