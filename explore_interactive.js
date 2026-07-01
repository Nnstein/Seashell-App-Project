const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.resolve(__dirname, 'prototype_screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  let shotNum = 1;
  
  const screenshot = async (name) => {
    const file = path.join(outDir, `${String(shotNum).padStart(2, '0')}_${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`Screenshot ${shotNum}: ${name}`);
    shotNum++;
  };
  
  // Home
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);
  await screenshot('home');
  
  // Click Check In (first one in hero)
  await page.locator('button:has-text("Check In")').first().click();
  await page.waitForTimeout(2500);
  await screenshot('checkin_form');
  
  // Click Staff Portal — Admin Login
  const adminBtn = page.locator('text=/Staff Portal — Admin Login/i');
  if (await adminBtn.isVisible().catch(() => false)) {
    await adminBtn.click();
    await page.waitForTimeout(2500);
    await screenshot('admin_login');
  }
  
  // Try to login as admin (if there's a form)
  const username = page.locator('input[type="text"], input[name="username"], input[name="email"]').first();
  const password = page.locator('input[type="password"]').first();
  if (await username.isVisible().catch(() => false) && await password.isVisible().catch(() => false)) {
    await username.fill('admin');
    await password.fill('admin');
    const submit = page.locator('button[type="submit"]').first();
    await submit.click();
    await page.waitForTimeout(3000);
    await screenshot('admin_dashboard');
  }
  
  // Go back to home and explore bottom nav
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Click Rooms
  const roomsBtn = page.locator('text=/Rooms/i').first();
  if (await roomsBtn.isVisible().catch(() => false)) {
    await roomsBtn.click();
    await page.waitForTimeout(2500);
    await screenshot('rooms');
  }
  
  // Click Dine
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  const dineBtn = page.locator('text=/Dine/i').first();
  if (await dineBtn.isVisible().catch(() => false)) {
    await dineBtn.click();
    await page.waitForTimeout(2500);
    await screenshot('dining');
  }
  
  // Click Facilities
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  const facBtn = page.locator('text=/Facilities/i').first();
  if (await facBtn.isVisible().catch(() => false)) {
    await facBtn.click();
    await page.waitForTimeout(2500);
    await screenshot('facilities');
  }
  
  // Click Gallery
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  const galBtn = page.locator('text=/Gallery/i').first();
  if (await galBtn.isVisible().catch(() => false)) {
    await galBtn.click();
    await page.waitForTimeout(2500);
    await screenshot('gallery');
  }
  
  // Click Contact
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  const contactBtn = page.locator('text=/Contact/i').first();
  if (await contactBtn.isVisible().catch(() => false)) {
    await contactBtn.click();
    await page.waitForTimeout(2500);
    await screenshot('contact');
  }
  
  // Click Get Day Pass (from home)
  await page.goto('https://xtksrnjdotye6.kimi.page', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  const dpBtn = page.locator('button:has-text("Get Day Pass")').first();
  if (await dpBtn.isVisible().catch(() => false)) {
    await dpBtn.click();
    await page.waitForTimeout(2500);
    await screenshot('daypass');
  }
  
  // From daypass, try to click sub-nav items if present (Wallet, Map, History, Account)
  const subNavs = ['Wallet', 'Map', 'History', 'Account'];
  for (const nav of subNavs) {
    const navBtn = page.locator(`text=/${nav}/i`).nth(1);
    if (await navBtn.isVisible().catch(() => false)) {
      await navBtn.click();
      await page.waitForTimeout(2000);
      await screenshot(`daypass_${nav.toLowerCase()}`);
    }
  }
  
  await browser.close();
  console.log('Done');
})();
