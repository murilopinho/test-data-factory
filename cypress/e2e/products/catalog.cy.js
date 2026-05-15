const productsPage = require('../../support/page-objects/ProductsPage');

describe('Product Catalog', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
    productsPage.assertIsOnProductsPage();
  });

  it('should display 6 products on the inventory page', () => {
    productsPage.elements.inventoryItems().should('have.length', 6);
  });

  it('should display product name, price and add-to-cart button for each item', () => {
    productsPage.elements.inventoryItems().each($item => {
      cy.wrap($item).find('.inventory_item_name').should('be.visible');
      cy.wrap($item).find('.inventory_item_price').should('be.visible');
      cy.wrap($item).find('button').should('be.visible');
    });
  });

  it('should sort products by price low to high', () => {
    productsPage.sortBy('lohi');
    productsPage.getItemPrices().then(prices => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('should sort products by price high to low', () => {
    productsPage.sortBy('hilo');
    productsPage.getItemPrices().then(prices => {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('should sort products by name A-Z', () => {
    productsPage.sortBy('az');
    productsPage.getItemNames().then(names => {
      const sorted = [...names].sort();
      expect(names).to.deep.equal(sorted);
    });
  });

  it('should sort products by name Z-A', () => {
    productsPage.sortBy('za');
    productsPage.getItemNames().then(names => {
      const sorted = [...names].sort().reverse();
      expect(names).to.deep.equal(sorted);
    });
  });

  it('should open product detail page on click', () => {
    productsPage.elements.itemNames().first().click();
    cy.url().should('include', '/inventory-item.html');
    cy.get('.inventory_details_name').should('be.visible');
  });
});

