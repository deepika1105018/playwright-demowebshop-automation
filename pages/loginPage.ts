import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  
async login(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email or password is undefined! Check your .env file.');
  }

 // async login(email: string, password: string) {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Demo Web Shop/);
    await this.page.getByRole('link', { name: 'Log in' }).click();
    await this.page.getByRole('textbox', { name: 'Email:' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password:' }).fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}
