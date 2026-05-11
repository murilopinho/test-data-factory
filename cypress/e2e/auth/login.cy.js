const loginPage = require('../../support/page-objects/LoginPage');
const productsPage = require('../../support/page-objects/ProductsPage');

describe('Login', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully with valid credentials', () => {
    loginPage.login('standard_user', 'secret_sauce');
    productsPage.assertIsOnProductsPage();
    cy.url().should('include', '/inventory.html');
  });

  it('should show error for invalid username', () => {
    loginPage.login('wrong_user', 'secret_sauce');
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('should show error for invalid password', () => {
    loginPage.login('standard_user', 'wrong_pass');
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('should show error for empty username', () => {
    loginPage.fillPassword('secret_sauce').submit();
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Username is required');
  });

  it('should show error for empty password', () => {
    loginPage.fillUsername('standard_user').submit();
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Password is required');
  });

  it('should show error for locked out user', () => {
    loginPage.login('locked_out_user', 'secret_sauce');
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out');
  });

  it('should redirect to products page after successful login', () => {
    loginPage.login('standard_user', 'secret_sauce');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/inventory.html`);
  });

  it('should not login with empty fields', () => {
    loginPage.submit();
    loginPage.getErrorMessage().should('be.visible');
    cy.url().should('not.include', '/inventory.html');
  });
});
