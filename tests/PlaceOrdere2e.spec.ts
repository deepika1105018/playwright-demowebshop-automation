import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CategoryPage } from '../pages/categoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckOutPage';
import { calculateTotal } from '../utils/PriceCalculator';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  const cart = new CartPage(page);

  await login.login(
    process.env.USER_EMAIL!,
    process.env.USER_PASSWORD!
  );

  await cart.clearCart(); 
});

test('Place order with multiple products and validate price', async ({ page }) => {
  const category = new CategoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  //  Add products
  await category.openCategory('Books');
  await category.addToCart(2);
  await category.configureAndAddComputer();
  await category.openCategory('Apparel & Shoes');
  await category.addApparelToCart(2);

  // Cart price validation
  await cart.openCart();
  const subtotals = await cart.logCartPriceDetails();
const expectedTotal = calculateTotal(subtotals);
const actualTotal = await cart.getCartTotal();

  console.log(` Calculated Total (Code): ${expectedTotal}`);
 console.log(` UI Cart Total: ${actualTotal}`);
  expect(actualTotal).toBe(expectedTotal);

  // Checkout
  await cart.acceptTermsAndCheckout();
  await cart.continueBilling();
  await checkout.fillBillingDetails();
  await cart.completeCheckout();
});