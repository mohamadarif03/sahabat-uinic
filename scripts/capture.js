const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  {
    name: '01_Landing_Page.png',
    url: 'http://localhost:3000',
    fullPage: true,
    prepare: async (page) => {
      // Dismiss onboarding modal so landing page content is clear
      await page.evaluate(() => {
        localStorage.setItem('accessibility_mode', 'reguler');
      });
      await page.reload({ waitUntil: 'networkidle2' });
      // Scroll to trigger any scroll animations
      await page.evaluate(async () => {
        window.scrollTo(0, document.body.scrollHeight / 3);
        await new Promise((r) => setTimeout(r, 400));
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 400));
      });
    }
  },
  {
    name: '02_Onboarding_Modal.png',
    url: 'http://localhost:3000',
    fullPage: false,
    prepare: async (page) => {
      // Clear localStorage so modal pops up
      await page.evaluate(() => {
        localStorage.removeItem('accessibility_mode');
      });
      await page.reload({ waitUntil: 'networkidle2' });
      await new Promise((r) => setTimeout(r, 1200)); // wait for modal animation
    }
  },
  {
    name: '03_Dashboard.png',
    url: 'http://localhost:3000/dashboard',
    fullPage: true,
  },
  {
    name: '04_Iqra_Menu.png',
    url: 'http://localhost:3000/iqra',
    fullPage: true,
  },
  {
    name: '05_Iqra_Hijaiyah.png',
    url: 'http://localhost:3000/iqra/hijaiyah',
    fullPage: true,
  },
  {
    name: '06_Iqra_Hijaiyah_Latihan.png',
    url: 'http://localhost:3000/iqra/hijaiyah/baa',
    fullPage: true,
  },
  {
    name: '07_Iqra_Hijaiyah_Gesture.png',
    url: 'http://localhost:3000/iqra/hijaiyah/baa/gesture',
    fullPage: true,
  },
  {
    name: '08_Daftar_Surah_Pendek.png',
    url: 'http://localhost:3000/ayat',
    fullPage: true,
  },
  {
    name: '09_Detail_Surah_Al_Fatihah.png',
    url: 'http://localhost:3000/ayat/1',
    fullPage: true,
  },
  {
    name: '10_Menulis_Kaligrafi.png',
    url: 'http://localhost:3000/menulis',
    fullPage: true,
  },
];

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const item of routes) {
    console.log(`Capturing: ${item.name} (${item.url})...`);
    try {
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
      if (item.prepare) {
        await item.prepare(page);
      }
      await new Promise((r) => setTimeout(r, 600));

      const savePath = path.join(outputDir, item.name);
      await page.screenshot({
        path: savePath,
        fullPage: item.fullPage !== false,
      });
      console.log(`Saved: ${savePath}`);
    } catch (err) {
      console.error(`Error capturing ${item.name}:`, err);
    }
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
})();
