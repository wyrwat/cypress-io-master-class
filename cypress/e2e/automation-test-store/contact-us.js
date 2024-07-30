///<reference types="Cypress" />

describe("Test Contact Us form via Automation Test Store", () => {
  it.only("Should be able to submit a successful submission via contact us form", () => {
    cy.visit("https://automationteststore.com/");
    cy.get('a[href$="contact"]')
      .click()
      .then((linkContent) => {
        console.log(linkContent.text());
      });
    cy.url().should(
      "eq",
      "https://automationteststore.com/index.php?rt=content/contact"
    );
    cy.get(".maintext").contains("Contact Us").should("be.visible");
    cy.get("#ContactUsFrm_first_name").type("Joe");

    cy.get("#ContactUsFrm_email").type("Joe@joe.com");
    cy.get("#ContactUsFrm_enquiry").type(
      "Do You provide extra discounts for large purchase"
    );
    cy.get('button[title="Submit"]').click();
    cy.get("p")
      .contains("Your enquiry has been successfully sent to the store owner!")
      .should("be.visible");
  });
});
