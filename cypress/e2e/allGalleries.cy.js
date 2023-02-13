/// <reference types="Cypress" />

import { authLogin } from "../page_objects/loginPage";
import { allGalleries } from "../page_objects/allGalleries";

const credentials = {
  email: "nedovic.filip@gmail.com",
  password: "Test12345",
};

describe("all galleries page test", () => {
  beforeEach("visit app and login", () => {
    cy.visit("/login");
    authLogin.login(credentials.email, credentials.password);
    cy.url().should("not.include", "/login");
  });

  //   it("loads page successfully", () => {
  //     allGalleries.allGalleriesHeading
  //       .should("be.visible")
  //       .and("exist")
  //       .and("have.text", "All Galleries");

  //     allGalleries.singleGallery
  //         .find("img")
  //         .should("be.visible");
  //   });

  it("test pagination", () => {
    allGalleries.allGalleries.should("be.visible").and("have.length", 10);
    allGalleries.loadMoreBtn.click();
    allGalleries.allGalleries.should("be.visible").and("have.length", 20);
    allGalleries.loadMoreBtn.click();
    allGalleries.allGalleries.should("be.visible").and("have.length", 30);
  });

  it("test search", () => {
    let searchTerm = "Gallery with 2 images";

    allGalleries.search(searchTerm);
    allGalleries.allGalleries.should("be.visible").and("have.length", 6);
    allGalleries.singleGallery.find("a").first().click();
    cy.get("h1").should("be.visible").and("have.text", searchTerm);
  });

  it.only("click on gallery title redirects to single gallery page", () => {
    allGalleries.singleGallery.find("a").first().click();
  });

  it.only("click on gallery author redirects to authors' page", () => {
    allGalleries.singleGallery.find("a").eq(1).click();
  });
});
