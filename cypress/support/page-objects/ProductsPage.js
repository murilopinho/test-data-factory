class ProductsPage {
  elements = {
    title: () => cy.get('.title'),
    inventoryList: () => cy.get('.inventory_list'),
    inventoryItems: () => cy.get('.inventory_item'),
    sortDropdown: () => cy.get('[data-test="product_sort_container"]'),
    cartBadge: () => cy.get('.shopping_cart_badge'),
    cartLink: () => cy.get('.shopping_cart_link'),
    itemPrices: () => cy.get('.inventory_item_price'),
    itemNames: () => cy.get('.inventory_item_name'),
  };

  assertIsOnProductsPage() {
    this.elements.title().should('have.text', 'Products');
    return this;
  }

  sortBy(option) {
    this.elements.sortDropdown().select(option);
    return this;
  }

  addToCart(productName) {
    cy.contains('.inventory_item', productName)
      .find('button[data-test^="add-to-cart"]')
      .click();
    return this;
  }

  removeFromCart(productName) {
    cy.contains('.inventory_item', productName)
      .find('button[data-test^="remove"]')
      .click();
    return this;
  }

  getCartCount() {
    return this.elements.cartBadge();
  }

  goToCart() {
    this.elements.cartLink().click();
    return this;
  }

  getItemPrices() {
    return this.elements.itemPrices().then($prices =>
      $prices.toArray().map(el => parseFloat(el.innerText.replace('$', '')))
    );
  }

  getItemNames() {
    return this.elements.itemNames().then($names =>
      $names.toArray().map(el => el.innerText)
    );
  }
}

module.exports = new ProductsPage();
