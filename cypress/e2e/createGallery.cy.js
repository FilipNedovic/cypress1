/// <refernce types="Cypress" />

import { authLogin } from "../page_objects/loginPage";
import { createGallery } from "../page_objects/createGallery";
import { allGalleries } from "../page_objects/allGalleries";
import { faker } from "@faker-js/faker";

let credentials = {
  email: "nedovic.filip@gmail.com",
  password: "Test12345",
};

let galleryData = {
  title: faker.lorem.word(),
  description: faker.lorem.paragraph(),
  imageUrl: faker.image.imageUrl() + ".jpg",
};

describe("create gallery test", () => {
  before("visit app and log in", () => {
    cy.visit("/login");
    authLogin.login(credentials.email, credentials.password);
    cy.url().should("not.include", "/login");
  });

  it("create gallery", () => {
    createGallery.createGalleryLink.click();
    createGallery.createGalleryHeading
      .should("be.visible")
      .and("have.text", "Create Gallery");

    createGallery.createGallery(
      galleryData.title,
      galleryData.description,
      galleryData.imageUrl
    );

    allGalleries.singleGallery
      .find("h2")
      .should("have.text", galleryData.title);
  });
});
