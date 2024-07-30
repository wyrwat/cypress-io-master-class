///<reference types="Cypress" />

describe("Cypress web security", () => {
  it("Validate visiting two different domains", () => {
    cy.visit("https://automationteststore.com/");
    cy.visit("http://www.webdriveruniversity.com");
  });

  it("Validate visiting two different domains via user action", () => {
    cy.visit("http://www.webdriveruniversity.com");
    cy.get("#automation-test-store").invoke("removeAttr", "target").click();
  });

  it.only("Origin command", () => {
    cy.origin("webdriveruniversity.com", () => {
      cy.visit("/");
    });

    cy.origin("automationteststore.com", () => {
      cy.visit("/");
    });

    //Same Origin Example:
    //cy.visit("https://www.webdriveruniversity.com");
    //cy.visit("https://selectors.webdriveruniversity.com");
  });
});
