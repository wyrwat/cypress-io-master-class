///<reference types="Cypress" />

describe("Test Contact Us form", () => {
  it.only("Should be able to submit a successful submission via contact us form", () => {
    // cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
    cy.visit("http://www.webdriveruniversity.com");
    cy.get("#contact-us").invoke("removeAttr", "target").click({ force: true });

    cy.document().should("have.property", "charset").and("eq", "UTF-8");
    cy.title().should("include", "Webdriver | Contact Us");
    cy.url().should("include", "contactus");
    cy.get('[name="first_name"]').type("Joe");
    cy.get('[name="last_name"]').type("JoeJoe");
    cy.get('[name="email"]').type("joejoe@gmail.com");
    cy.get("textarea.feedback-input").type("comment");
    cy.get('[type="submit"]').click();
    cy.get("#contact_replyh1").contains("Thank You for your Message!");
  });

  it("Should not be able to submit a successful submission via contact us form as all fields are required", () => {
    cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
    cy.get('[name="first_name"]').type("Joe");
    cy.get('[name="last_name"]').type("JoeJoe");
    cy.get('[type="submit"]').click();
    cy.get("body").contains("Error: all fields are required");
  });
});
