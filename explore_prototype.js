const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.resolve(__dirname, 'prototype_screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  // Navigate to home
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(outDir, '01_home.png'), fullPage: true });
  console.log('Screenshot: home');
  
  // Get all links and buttons
  const links = await page.locator('a, button, [role="button"]').all();
  const linkInfo = [];
  for (let i = 0; i < Math.min(links.length, 50); i++) {
    const text = await links[i].innerText().catch(() => '');
    const href = await links[i].getAttribute('href').catch(() => null);
    linkInfo.push({ text: text.trim(), href });
  }
  console.log('LINKS:', JSON.stringify(linkInfo, null, 2));
  
  // Try clicking "Check In" button if exists
  const checkIn = page.locator('text=/Check In/i').first();
  if (await checkIn.isVisible().catch(() => false)) {
    await checkIn.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, '02_checkin.png'), fullPage: true });
    console.log('Screenshot: checkin');
  }
  
  // Try clicking "Get Day Pass"
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  const dayPass = page.locator('text=/Get Day Pass/i').first();
  if (await dayPass.isVisible().catch(() => false)) {
    await dayPass.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, '03_daypass.png'), fullPage: true });
    console.log('Screenshot: daypass');
  }
  
  // Try bottom nav links
  const navItems = ['Rooms', 'Dine', 'Facilities', 'Gallery', 'Contact'];
  let shotNum = 4;
  for (const item of navItems) {
    await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    const btn = page.locator(`text=/${item}/i`).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(outDir, `${String(shotNum).padStart(2, '0')}_${item.toLowerCase()}.png`), fullPage: true });
      console.log(`Screenshot: ${item}`);
      shotNum++;
    }
  }
  
  // Try admin routes directly
  const adminRoutes = [
    '/admin',
    '/admin/login',
    '/admin/dashboard',
    '/admin/guests',
    '/admin/rooms',
    '/admin/dining',
    '/admin/facilities',
    '/admin/daypass',
    '/admin/reports',
    '/admin/content'
  ];
  for (const route of adminRoutes) {
    await page.goto(`https://xtksrnjdotye6.kimi.page${route}`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, `${String(shotNum).padStart(2, '0')}_admin_${route.replace(/\//g, '_')}.png`), fullPage: true });
    console.log(`Screenshot: admin ${route}`);
    shotNum++;
  }
  
  // Try guest app routes
  const guestRoutes = [
    '/rooms',
    '/dining',
    '/facilities',
    '/explore',
    '/profile',
    '/day-pass-wallet',
    '/day-pass-history',
    '/day-pass-account'
  ];
  for (const route of guestRoutes) {
    await page.goto(`https://xtksrnjdotye6.kimi.page${route}`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(outDir, `${String(shotNum).padStart(2, '0')}_guest_${route.replace(/\//g, '_').replace(/^\//, '')}.png`), fullPage: true });
    console.log(`Screenshot: guest ${route}`);
    shotNum++;
  }
  
  await browser.close();
  console.log('Done. Screenshots saved to:', outDir);
})();
