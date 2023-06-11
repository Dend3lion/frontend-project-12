// @ts-check
/* eslint-disable no-useless-escape */

import { test, expect } from '@playwright/test';

const registerUser = {
  login: 'user',
  password: 'password',
};

const loginUser = {
  login: 'admin',
  password: 'admin',
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(300);

  await page.getByRole('link', { name: 'Group Chat' }).click();
});

test.describe('registration', () => {
  test('handle new user creation', async ({ page }) => {
    await page.getByTestId('toRegister').click();
    await page.getByLabel('username').type(registerUser.login);
    await page.getByLabel('password').first().type(registerUser.password);
    await page.getByLabel('confirm password').type(registerUser.password);
    await page.getByTestId('submitButton').click();
    await page.waitForURL('**/');
  });

  test('handle validation', async ({ page }) => {
    await page.getByTestId('toRegister').click();
    await page.getByLabel('username').type('u');
    await page.getByLabel('password').first().type('pas');
    await page.getByLabel('confirm password').type('passw');
    await page.getByTestId('submitButton').click();

    await expect(await page.getByText('From 3 to 20 characters')).toHaveCount(1);
    await expect(await page.getByText('At least 6 characters')).toHaveCount(1);
    await expect(await page.getByText('Passwords must match')).toHaveCount(1);
  });
});

test.describe('auth', () => {
  test('login page on enter as guest', async ({ page }) => {
    await page.waitForURL('**/login');
    await expect(await page.getByLabel('username')).toHaveCount(1);
    await expect(await page.getByLabel('password')).toHaveCount(1);
  });

  test('successful login', async ({ page }) => {
    await page.getByLabel('username').type(loginUser.login);
    await page.getByLabel('password').type(loginUser.password);
    await page.getByTestId('submitButton').click();

    await page.waitForURL('**/');
    await expect(await page.getByText('Wrong username or password')).toHaveCount(0);
  });

  test('handle login error', async ({ page }) => {
    await page.getByLabel('username').type('guest');
    await page.getByLabel('password').type('pass');
    await page.getByTestId('submitButton').click();

    await page.waitForURL('**/login');
    await expect(await page.getByText('Wrong username or password')).toHaveCount(1);
  });
});

test.describe('chat', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByLabel('username').type(loginUser.login);
    await page.getByLabel('password').type(loginUser.password);
    await page.getByTestId('submitButton').click();
    await page.getByTestId('messageInput');
  });

  test('messaging', async ({ page }) => {
    await page.getByTestId('messageInput').type('hello');
    await page.keyboard.press('Enter');
    await expect(await page.getByText('hello')).not.toHaveCount(0);
    await page.getByTestId('messageInput').type('world');
    await page.getByTestId('sendButton').click();
    await expect(await page.getByText('world')).not.toHaveCount(0);
  });

  test('profanity filter', async ({ page }) => {
    const profanityMessage = 'censored boobs';
    await page.getByTestId('messageInput').type(profanityMessage);
    await page.keyboard.press('Enter');
    await expect(await page.getByText(profanityMessage)).toHaveCount(0);
    await expect(await page.getByText('censored *****')).not.toHaveCount(0);
  });

  test('different channels', async ({ page }) => {
    await page.getByTestId('messageInput').type('message for general');
    await page.keyboard.press('Enter');
    await expect(await page.getByText('message for general')).not.toHaveCount(0);
    await page.getByRole('button', { name: 'random' }).click();
    await expect(await page.getByText('message for general')).toHaveCount(0);
    await page.getByTestId('messageInput').type('message for random');
    await page.keyboard.press('Enter');
    await expect(await page.getByText('message for random')).not.toHaveCount(0);
  });

  test('adding channel', async ({ page }) => {
    await page.getByTestId('addChannelButton').click();
    await page.getByLabel('name').type('test channel');
    await page.keyboard.press('Enter');

    await expect(await page.getByText('Channel added')).toBeVisible();
    await expect(await page.getByRole('button', { name: '# test channel' })).not.toHaveCount(0);
  });

  test('rename channel', async ({ page }) => {
    await page.getByTestId('manageChannelToggle').first().click();
    await page.getByTestId('renameChannelButton').click();
    const input = await page.getByLabel('name');
    await input.fill('');
    await input.type('new test channel');
    await page.keyboard.press('Enter');

    await expect(await page.getByText('Channel renamed')).toBeVisible();
    await page.waitForSelector('.modal', { state: 'hidden' });
    await expect(await page.getByRole('button', { name: '# test channel' })).toHaveCount(0);
    await expect(await page.getByRole('button', { name: '# new test channel' })).not.toHaveCount(0);
  });

  test('remove channel', async ({ page }) => {
    await page.getByTestId('manageChannelToggle').first().click();
    await page.getByTestId('removeChannelButton').click();
    await page.getByTestId('submitRemoval').click();

    await expect(await page.getByText('Channel removed')).toBeVisible();
    await page.waitForSelector('.modal', { state: 'hidden' });
    await expect(await page.getByRole('button', { name: '# new test channel' })).toHaveCount(0);
  });
});
