/// <reference types="Cypress" />

import { authLogin } from "../page_objects/loginPage";
import { faker } from "@faker-js/faker";

const credentials = {
  validEmail: "nedovic.filip@gmail.com",
  validPassword: "Test12345",
  invalidEmail: faker.internet.email(),
  invalidPassword: faker.lorem.word(),
};

describe("login tests", () => {
  beforeEach("visit app and click the login link", () => {
    cy.visit("/");
    authLogin.loginLink.click();
    cy.url().should("include", "/login");
    authLogin.loginPageHeading
      .should("be.visible")
      .and("have.text", "Please login");
  });

  it.only("login with invalid email address", () => {
    authLogin.login(credentials.invalidEmail, credentials.validPassword);
    cy.url().should("include", "/login");
    authLogin.errorMessage
      .should("be.visible")
      .and("have.text", "Bad Credentials")
      .and("have.css", "background-color", "rgb(248, 215, 218)")
      .and("have.class", "alert-danger");
  });

  it("login with valid credentials", () => {
    authLogin.login(credentials.validEmail, credentials.validPassword);
    cy.url().should("not.include", "/login");
  });
});
