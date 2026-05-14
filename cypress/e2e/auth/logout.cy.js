const productsPage = require('../../support/page-objects/ProductsPage');

describe('Logout', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
    productsPage.assertIsOnProductsPage();
  });

  it('should logout successfully via burger menu', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.get('[data-test="login-button"]').should('be.visible');
  });

  it('should not access inventory after logout', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
    cy.visit('/inventory.html');
    cy.url().should('not.include', '/inventory.html');
  });
});
