class CartPage {
  elements = {
    title: () => cy.get('.title'),
    cartItems: () => cy.get('.cart_item'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
    itemNames: () => cy.get('.inventory_item_name'),
    itemPrices: () => cy.get('.inventory_item_price'),
  };

  assertIsOnCartPage() {
    this.elements.title().should('have.text', 'Your Cart');
    return this;
  }

  assertItemCount(count) {
    this.elements.cartItems().should('have.length', count);
    return this;
  }

  assertContainsItem(productName) {
    this.elements.itemNames().should('contain', productName);
    return this;
  }

  removeItem(productName) {
    cy.contains('.cart_item', productName)
      .find('button[data-test^="remove"]')
      .click();
    return this;
  }

  proceedToCheckout() {
    this.elements.checkoutButton().click();
    return this;
  }

  continueShopping() {
    this.elements.continueShoppingButton().click();
    return this;
  }
}

module.exports = new CartPage();

