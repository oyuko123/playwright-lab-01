import { test, expect } from '@playwright/test';

// Test 1: Verify that a user can successfully log in and log out.
test('амжилттай нэвтрэх болон гарах', async ({ page }) => {
  // Open the SauceDemo website.
  await page.goto('https://www.saucedemo.com');

  // Enter valid login credentials.
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Click the Login button.
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify that the Products page is displayed after login.
  await expect(page.getByText('Products')).toBeVisible();

  // Verify that the URL changed to the inventory page.
  await expect(page).toHaveURL(/inventory\.html/);

  // Open the side menu.
  await page.getByRole('button', { name: 'Open Menu' }).click();

  // Log out of the application.
  await page.getByRole('link', { name: 'Logout' }).click();

  // Verify that the user has returned to the login page.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});


// Test 2: Verify that an incorrect password produces an error message.
test('буруу нууц үгээр нэвтрэх', async ({ page }) => {
  // Open the SauceDemo website.
  await page.goto('https://www.saucedemo.com');

  // Enter a valid username but an incorrect password.
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');

  // Attempt to log in.
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify that the expected error message is displayed.
  await expect(
    page.getByText(
      'Epic sadface: Username and password do not match any user in this service'
    )
  ).toBeVisible();

  // Verify that the user remains on the login page.
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});


// Test 3: Verify that a user can add a product to the shopping cart.
test('бараа сагслах', async ({ page }) => {
  // Open the SauceDemo website.
  await page.goto('https://www.saucedemo.com');

  // Log in with valid credentials.
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify that the Products page is displayed.
  await expect(page.getByText('Products')).toBeVisible();

  // Add the first available product to the shopping cart.
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Verify that the shopping cart contains one item.
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Open the side menu.
  await page.getByRole('button', { name: 'Open Menu' }).click();

  // Log out to keep the test independent and clean.
  await page.getByRole('link', { name: 'Logout' }).click();

  // Verify that logout was successful.
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});