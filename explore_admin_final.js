const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.resolve(__dirname, 'prototype_screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  // Login
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.locator('button:has-text("Check In")').first().click();
  await page.waitForTimeout(1500);
  await page.locator('text=/Staff Portal — Admin Login/i').click();
  await page.waitForTimeout(2500);
  await page.locator('input[type="email"]').fill('manager@seashell.kw');
  await page.locator('input[type="password"]').fill('admin2026');
  await page.locator('button:has-text("Sign In")').click();
  await page.waitForTimeout(4000);
  
  // Capture all links/buttons on dashboard for navigation
  const allElements = await page.locator('a, button').all();
  const navItems = [];
  for (const el of allElements) {
    const text = await el.innerText().catch(() => '');
    const href = await el.getAttribute('href').catch(() => null);
    if (text.trim().length > 0 && text.trim().length < 50) {
      navItems.push({ text: text.trim(), href });
    }
  }
  // Deduplicate
  const unique = [];
  const seen = new Set();
  for (const item of navItems) {
    const key = item.text;
    if (!seen.has(key)) { seen.add(key); unique.push(item); }
  }
  console.log('NAV ITEMS:', JSON.stringify(unique, null, 2));
  
  await page.screenshot({ path: path.join(outDir, '11_admin_dashboard.png'), fullPage: true });
  console.log('Screenshot 11: admin_dashboard');
  
  // Try clicking each unique nav item that looks like admin section
  const adminSections = ['Dashboard', 'Guests', 'Rooms', 'Dining', 'Facilities', 'Day Pass', 'Reports', 'Content', 'Settings', 'Staff', 'Logout'];
  let shotNum = 12;
  for (const section of adminSections) {
    const match = unique.find(u => u.text.toLowerCase().includes(section.toLowerCase()));
    if (match) {
      const loc = page.locator('text=' + match.text).first();
      if (await loc.isVisible().catch(() => false)) {
        await loc.click();
        await page.waitForTimeout(2500);
        const fileName = String(shotNum).padStart(2, '0') + '_admin_' + section.toLowerCase().replace(/\s+/g, '_') + '.png';
        await page.screenshot({ path: path.join(outDir, fileName), fullPage: true });
        console.log('Screenshot', shotNum, ':', section);
        shotNum++;
      }
    }
  }
  
  await browser.close();
})();
