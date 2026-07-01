const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.resolve(__dirname, 'prototype_screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  let shotNum = 10;
  
  const screenshot = async (name) => {
    const file = path.join(outDir, `${String(shotNum).padStart(2, '0')}_${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`Screenshot ${shotNum}: ${name}`);
    shotNum++;
  };
  
  // Go to admin login via check-in page
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.locator('button:has-text("Check In")').first().click();
  await page.waitForTimeout(2000);
  await page.locator('text=/Staff Portal — Admin Login/i').click();
  await page.waitForTimeout(2000);
  await screenshot('admin_login_page');
  
  // Login with demo credentials
  await page.locator('input[type="text"]').fill('manager@seashell.kw');
  await page.locator('input[type="password"]').fill('admin2026');
  await page.locator('button:has-text("Sign In")').click();
  await page.waitForTimeout(4000);
  await screenshot('admin_dashboard');
  
  // Get all sidebar nav items and click through them
  const navTexts = await page.locator('nav a, nav button, .sidebar a, .sidebar button, [class*="nav"] a, [class*="menu"] a').allInnerTexts();
  console.log('ADMIN NAV:', JSON.stringify(navTexts.filter(t => t.trim()), null, 2));
  
  // Try clicking common admin nav items by text
  const adminSections = ['Dashboard', 'Guests', 'Rooms', 'Dining', 'Facilities', 'Day Pass', 'Reports', 'Content', 'Settings', 'Staff'];
  for (const section of adminSections) {
    const link = page.locator(`nav >> text=/^${section}$/i`);
    if (await link.isVisible().catch(() => false)) {
      await link.click();
      await page.waitForTimeout(2500);
      await screenshot(`admin_${section.toLowerCase().replace(/\s+/g, '_')}`);
    }
  }
  
  // If sidebar nav didn't work, try broader selectors
  const allLinks = await page.locator('a, button').allInnerTexts();
  console.log('ALL LINKS ON DASHBOARD:', JSON.stringify(allLinks.filter(t => t.trim().length > 1), null, 2));
  
  await browser.close();
  console.log('Admin exploration done');
})();
