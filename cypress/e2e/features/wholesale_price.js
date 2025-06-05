import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import woocommerce from '../../support/wholesalePrice'

let site = new woocommerce();

before(() => {
  cy.clearCookies();
  cy.visit('/');
  site.login();
  site.homepageValidation();
})

Given('the user clicks the "Shop" menu', () => {
  site.goToShopMenu();
});
Then('they should see "Grace Chair" in the list of products', () => {
  site.validateWholesaleProductInShopPage();
});
Then('they should see its “Wholesale Price:” label and Wholesale price value are displayed', () => {
  site.validateWholesalePriceLabel();
});

Given('the user is on the homepage', () => {
  site.goToHomepage();
});
When('they search "Grace Chair" in the Search bar', () => {
  site.searchProduct();
});
Then('they should see "Grace chair" product in the Product page', () => {
  site.validateWholesaleProductInProductPage();
});
Then('they should see its Wholesale price value is displayed in Product page correctly', () => {
  site.validateWholesalePriceInProductPage();
});

When('they click “Add to cart” button', () => {
  site.addToCartProduct();
});
When('they click “View cart”', () => {
  site.viewCart();
});
Then('they should see its Wholesale price value is displayed in Cart page correctly', () => {
  site.validateWholesalePriceInCart();
});


Given('they add 5 quantities of the same wholesale product', () => {
  site.addMultipleQuantitiesToCart();
});
Then('they should see correct total price of the wholesale product in Cart page', () => {
  site.validateTotalPriceInCart();
});


Given('the user is on the Cart page', () => {
  site.validateCartPage();
});
When('the user proceeds to Checkout', () => {
  site.goToCheckout();
});
Then('they should see its Wholesale price value is displayed in Order Summary correctly', () => {
  site.validateWholesalePriceInOrderSummary();
});

Given('the user is on the Checkout page', () => {
  site.validateCheckoutPage();
});
Then('they should see correct total price of the wholesale product in Order Summary', () => {
  site.validateTotalPriceInOrderSummary();
});
