import './playright-coverage.js';
import { test, expect } from '@playwright/test';

test('should load student management home page', async ({ page }) => {
  await page.goto('http://localhost:5050/');
  await expect(page).toHaveTitle(/EduTrack/);
});

test.describe('Add Student Form', () => {
  test('should successfully add a student with valid data', async ({ page }) => {
    await page.goto('http://localhost:5050/add.html');
    
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john.doe@tp.edu.sg');
    await page.fill('#course', 'Diploma in IT');
    await page.fill('#gpa', '3.5');
    
    page.on('dialog', dialog => dialog.accept());
    await page.click('.submit-btn');
    
    await page.waitForTimeout(500);
  });

  test('should show alert when required fields are missing', async ({ page }) => {
    await page.goto('http://localhost:5050/add.html');
    
    let alertMessage = '';
    page.on('dialog', dialog => {
      alertMessage = dialog.message();
      dialog.accept();
    });
    
    await page.click('.submit-btn');
    await page.waitForTimeout(100);
    
    expect(alertMessage).toBe('All fields are required!');
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('http://localhost:5050/add.html');
    
    await page.fill('#name', 'Jane Doe');
    await page.fill('#email', 'invalidemail');
    await page.fill('#course', 'Diploma in Business');
    await page.fill('#gpa', '3.8');
    
    let alertMessage = '';
    page.on('dialog', dialog => {
      alertMessage = dialog.message();
      dialog.accept();
    });
    
    await page.click('.submit-btn');
    await page.waitForTimeout(100);
    
    expect(alertMessage).toBe('Email must contain @ symbol');
  });
});