import { expect, Page } from '@playwright/test';

export class CategoryPage {
  constructor(private page: Page) {}

 
  async openCategory(categoryName: string) {
    await this.page.getByRole('link', { name: categoryName }).first().click();
  }

  
  async openProductByIndex(index: number) {
    const productItems = this.page.locator('.product-item');
    await productItems.nth(index).locator('h2 a').click();
  }


  async openProductByName(productName: string) {
    await this.page.getByRole('link', { name: productName }).first().click();
  }

    // Books category
  async addToCart(index: number) {
    await this.openProductByIndex(index);
    await this.page.locator('input.button-1.add-to-cart-button').click();
    await expect(this.page.locator('#bar-notification')).toContainText(
      'The product has been added to your shopping cart'
    );
  }

  // Desktops category (with configuration)
  async configureAndAddComputer() {
    await this.page.locator('a:has-text("Computers")').first().click();

   await this.page.locator('a[href="/desktops"][title="Show products in category Desktops"]').first().click();
   await this.openProductByIndex(0);
   
    await this.page.getByRole('radio', { name: 'Fast [+100.00]' }).check();
  //await this.page.getByRole('radio', { name: '8GB [+60.00]' }).check(); 
  
  await this.page.waitForTimeout(500); 

  await this.page.getByRole('checkbox', { name: 'Office Suite [+100.00]' }).check();
    

    await this.page.locator('input.button-1.add-to-cart-button').click();
    await expect(this.page.locator('#bar-notification')).toContainText(
      'The product has been added to your shopping cart'
    );
  }

  // Apparel / Jewelry category
  async addApparelToCart(index: number) {
    await this.openProductByIndex(index);
    await this.page.locator('input.button-1.add-to-cart-button').click();
    await expect(this.page.locator('#bar-notification')).toContainText(
      'The product has been added to your shopping cart'
    );
  }
}
