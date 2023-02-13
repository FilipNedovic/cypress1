const locators = require("../fixtures/locators.json");

describe("login tests", () => {
  before("visit app and click the login link", () => {
    cy.visit("/");
    cy.get(locators.loginButton).click();
  });

  it("login with valid credentials", () => {
    cy.get(locators.login.emailInput).type("test@mail.com");
    cy.get(locators.login.passwordInput).type("Test12345!");
    cy.get(locators.login.submitButton).click();
    cy.url().should("not.include", "/login");
  });
});

beforeEach(() => {
  cy.visit("/");
});
