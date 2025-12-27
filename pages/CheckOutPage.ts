import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillBillingDetails() {
    await this.page.selectOption('#BillingNewAddress_CountryId', { label: 'United Arab Emirates' });
    await this.page.fill('#BillingNewAddress_Address1', 'al nahdha');

    await this.page.getByRole('textbox', { name: 'City:' }).fill('Dubai');
    await this.page.getByRole('textbox', { name: 'Zip / postal code:' }).fill('500000');
    await this.page.getByRole('textbox', { name: 'Phone number:' }).fill('0528071914');
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

 
}
