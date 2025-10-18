require('dotenv').config();
const puppeteer = require('puppeteer');

(async () => {
  const url = process.env.TARGET_URL || 'https://example.com'; // ← yahan apni website ka link daalna

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const data = await page.evaluate(() => ({
    title: document.title,
    heading: document.querySelector('h1')?.innerText || 'No H1 found'
  }));

  console.log('✅ Scraped:', data);

  await browser.close();
})();
