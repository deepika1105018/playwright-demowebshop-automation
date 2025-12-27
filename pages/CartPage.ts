import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async clearCart() {
  await this.page.getByRole('link', { name: /Shopping cart/ }).first().click();

  const removeCheckboxes = this.page.locator(
    'input[name="removefromcart"]'
  );

  const count = await removeCheckboxes.count();

  if (count === 0) {
    return;
  }

  for (let i = 0; i < count; i++) {
    await removeCheckboxes.nth(i).check();
  }

  await this.page.getByRole('button', { name: 'Update shopping cart' }).click();

  await expect(
    this.page.getByText('Your Shopping Cart is empty!')
  ).toBeVisible();
}

    async openCart() {
    await this.page.getByRole('link', { name: 'Shopping cart', exact: true }).click();
    await expect(this.page).toHaveURL(/\/cart/);
  }

  async getAllProductSubtotals(): Promise<number[]> {
    const prices = await this.page
      .locator('.product-subtotal')
      .allInnerTexts();

    return prices.map(p =>
      parseFloat(p.replace('$', '').replace(',', '').trim())
    );
  }

  async getSubTotal(): Promise<number> {
    const subtotal = this.page.locator(
      '.order-subtotal .value-summary strong'
    );

    await expect(subtotal).toBeVisible();

    const text = await subtotal.innerText();
    return parseFloat(text.replace('$', '').replace(',', '').trim());
  }

  
async getCartTotal(): Promise<number> {
  const total = this.page.locator(
    '.cart-total .order-total strong'
  );

  await expect(total).toBeVisible();

  const text = await total.innerText();
  return parseFloat(text.replace('$', '').replace(',', '').trim());
}

  async acceptTermsAndCheckout() {
    await this.page.locator('#termsofservice').check();
    await this.page.getByRole('button', { name: 'Checkout' }).click();

  }

   async continueBilling() {
    // Select by value
await this.page.selectOption('#billing-address-select', '');
await this.page.selectOption('#billing-address-select', { label: 'New Address' });   
    }
  async continueShippingAddress() {
    await this.page
      .locator('#shipping-buttons-container input[value="Continue"]')
      .click();
  }

  async continueShippingMethod() {
    await this.page
      .locator('#shipping-method-buttons-container input[value="Continue"]')
      .click();
  }

  async continuePaymentMethod() {
    await this.page
      .locator('#payment-method-buttons-container input[value="Continue"]')
      .click();
  }

  async continuePaymentInfo() {
    await this.page
      .locator('#payment-info-buttons-container input[value="Continue"]')
      .click();
  }

  async confirmOrder() {
    await this.page
      .locator('#confirm-order-buttons-container input[value="Confirm"]')
      .click();

    await expect(
      this.page.getByText('Your order has been successfully processed!')
    ).toBeVisible();
  }

  async completeCheckout() {
    await this.continueBilling();
    await this.continueShippingAddress();
    await this.continueShippingMethod();
    await this.continuePaymentMethod();
    await this.continuePaymentInfo();
    await this.confirmOrder();
  }

  async logCartPriceDetails(): Promise<number[]> {
  const rows = this.page.locator('tr.cart-item-row');
  const count = await rows.count();

  const subtotals: number[] = [];

  console.log(' CART PRICE DETAILS');

  for (let i = 0; i < count; i++) {
    const row = rows.nth(i);

    const productName = await row.locator('a.product-name').innerText();
    const unitPriceText = await row.locator('.unit-price').innerText();
    const qty = await row.locator('.qty-input').inputValue();
    const subtotalText = await row.locator('.subtotal').innerText();

    const unitPrice = parseFloat(unitPriceText.replace('$', '').trim());
    const subtotal = parseFloat(subtotalText.replace('$', '').trim());

    subtotals.push(subtotal);

    console.log(`
Product: ${productName}
Unit Price: ${unitPrice}
Quantity: ${qty}
Subtotal: ${subtotal}
----------------------------
`);
  }

  return subtotals;
}
}
