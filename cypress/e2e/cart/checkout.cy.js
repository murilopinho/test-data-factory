const productsPage = require('../../support/page-objects/ProductsPage');
const cartPage = require('../../support/page-objects/CartPage');

describe('Cart & Checkout', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
    productsPage.assertIsOnProductsPage();
  });

  it('should add a product to the cart', () => {
    productsPage.addToCart('Sauce Labs Backpack');
    productsPage.getCartCount().should('have.text', '1');
  });

  it('should add multiple products to the cart', () => {
    productsPage.addToCart('Sauce Labs Backpack');
    productsPage.addToCart('Sauce Labs Bike Light');
    productsPage.getCartCount().should('have.text', '2');
  });

  it('should show added product in cart page', () => {
    productsPage.addToCart('Sauce Labs Backpack');
    productsPage.goToCart();
    cartPage.assertIsOnCartPage();
    cartPage.assertContainsItem('Sauce Labs Backpack');
  });

  it('should remove product from cart page', () => {
    productsPage.addToCart('Sauce Labs Backpack');
    productsPage.goToCart();
    cartPage.removeItem('Sauce Labs Backpack');
    cartPage.assertItemCount(0);
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('should change add-to-cart button to remove after adding', () => {
    productsPage.addToCart('Sauce Labs Backpack');
    cy.contains('.inventory_item', 'Sauce Labs Backpack')
      .find('button')
      .should('have.text', 'Remove');
  });

  it('should complete full checkout flow', () => {
    productsPage.addToCart('Sauce Labs Backpack');
    productsPage.goToCart();
    cartPage.proceedToCheckout();

    // Step 1: Fill checkout info
    cy.get('[data-test="firstName"]').type('Murilo');
    cy.get('[data-test="lastName"]').type('Pinho');
    cy.get('[data-test="postalCode"]').type('70000-000');
    cy.get('[data-test="continue"]').click();

    // Step 2: Review order
    cy.get('.summary_info').should('be.visible');
    cy.get('.cart_item').should('have.length', 1);
    cy.get('[data-test="finish"]').click();

    // Confirmation
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    cy.url().should('include', '/checkout-complete.html');
  });

  it('should show validation error if checkout info is empty', () => {
    productsPage.addToCart('Sauce Labs Backpack');
    productsPage.goToCart();
    cartPage.proceedToCheckout();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'First Name is required');
  });

  it('should keep cart items after continuing shopping', () => {
    productsPage.addToCart('Sauce Labs Backpack');
    productsPage.goToCart();
    cartPage.continueShopping();
    productsPage.assertIsOnProductsPage();
    productsPage.getCartCount().should('have.text', '1');
  });
});
