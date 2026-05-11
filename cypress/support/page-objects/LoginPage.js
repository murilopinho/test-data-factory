class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  visit() {
    cy.visit('/');
    return this;
  }

  fillUsername(username) {
    this.elements.usernameInput().clear().type(username);
    return this;
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password);
    return this;
  }

  submit() {
    this.elements.loginButton().click();
    return this;
  }

  login(username, password) {
    return this.fillUsername(username).fillPassword(password).submit();
  }

  getErrorMessage() {
    return this.elements.errorMessage();
  }
}

module.exports = new LoginPage();
