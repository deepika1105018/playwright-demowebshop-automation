# Playwright Demo Web Shop Automation

##  Project Overview
This project demonstrates **end-to-end UI automation using Playwright with TypeScript** for the website:

🔗 https://demowebshop.tricentis.com

The automation follows **best practices** such as Page Object Model (POM), data-driven testing, environment variables, and reporting.

---

##  Automated Test Scenario
**Place Order with Multiple Products (Price Validation)**

### Test Flow
1. Launch Demo Web Shop
2. Login using credentials from environment variables
3. Add multiple products to cart
4. Validate:
   - Unit Price
   - Quantity
   - Subtotal per product
5. Calculate expected total in code
6. Compare **UI Cart Total vs Calculated Total**
7. Proceed through checkout
8. Verify successful execution

✔ Console output clearly shows price validation  
✔ UI total and calculated total must match

---

##  Tech Stack
- **Playwright**
- **TypeScript**
- **Node.js**
- **dotenv**
- **Playwright HTML Reporter**

---

##  Project Structure
├── pages/ # Page Object Model classes
│ ├── CartPage.ts
│ ├── CategoryPage.ts
│ ├── CheckOutPage.ts
│ └── LoginPage.ts
│
├── tests/
│ └── PlaceOrder2e2.spec.ts
│
├── test-data/
│ └── orderData.json # External test data
│
├── utils/
│ └── PriceCalculators.ts # Price calculation logic
│
├── reports/
│ └── html-report/ # Playwright HTML report
│
├── playwright-results/ # Test execution results
├── credential.env # Environment variables (not commit  in Git)
├── playwright.config.ts
├── package.json
└── README.md

## Environment Variables
Sensitive data is **not hardcoded**.

Create a file named **credential.env** in the root folder:

```env
EMAIL=your_test_email@example.com
PASSWORD=your_password

Installation & Setup
1️ Clone Repository
git clone  https://github.com/deepika1105018/playwright-demowebshop-automation.git 
cd playwright-demowebshop-automation

2️ Install Dependencies
npm install

3 Install Playwright Browsers
npx playwright install

4 Execute Tests
npx playwright test

 View HTML Test Report
npx playwright show-report reports/html-report


Sample output:

Calculated Total (Code): 1025
UI Cart Total: 1025
✔ Test Passed