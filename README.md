# sahabat-uinic

# SAHABAT - Platform Pembelajaran Al-Qur'an Inklusif Berbasis AI

**SAHABAT** adalah platform web inklusif yang dirancang untuk memfasilitasi setiap insan dalam mempelajari Al-Qur'an tanpa batasan, dengan dukungan kecerdasan buatan (*Artificial Intelligence*) serta antarmuka yang ramah disabilitas.

---

## Fitur Utama

- **Voice Recognition (AI Suara)**: Koreksi hafalan dan tajwid tilawah secara otomatis dan *real-time*.
- **Gesture Recognition (AI Isyarat)**: Deteksi 21 titik sendi jari tangan untuk pembelajaran huruf Hijaiyah berstandar bahasa isyarat ABATA.
- **Handwriting Recognition (AI Kaligrafi)**: Evaluasi goresan kurva, titik, dan harakat kaligrafi huruf Arab pada canvas interaktif.
- **Aksesibilitas Multi-Kebutuhan**:
  - Mode Tunanetra (Screen Reader & Audio Guide komprehensif)
  - Mode Tunarungu / Wicara (Interaksi visual dan panduan gestur)
  - Mode Ramah Disleksia (Font berbobot bawah, jarak spasi khusus, & kontras tinggi)
- **114 Surah & Pembelajaran Iqra'**: Materi berjenjang lengkap dengan audio qari dan transliterasi latin.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router, Turbopack / Webpack)
- **UI & Styling**: React 19, Tailwind CSS v4, Framer Motion
- **AI & Computer Vision**: MediaPipe Hands, ONNX Runtime Web, Web Audio API
- **PWA**: Progressive Web App ready (offline support & installable)

---

## Menjalankan Proyek Secara Lokal

1. **Install Dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```

3. **Buka Aplikasi**:
   Akses [http://localhost:3000](http://localhost:3000) di browser.

4. **Build untuk Produksi**:
   ```bash
   npm run build
   npm run start
   ```

---

## Lisensi & Kontribusi

Dikembangkan untuk kompetisi inovasi teknologi inklusif. Hak cipta &copy; 2026 Tim SAHABAT.
