Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('loginAsStandardUser', () => {
  cy.login(
    Cypress.env('standardUser') || 'standard_user',
    Cypress.env('password') || 'secret_sauce'
  );
});

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.contains('.inventory_item', productName)
    .find('button[data-test^="add-to-cart"]')
    .click();
});
