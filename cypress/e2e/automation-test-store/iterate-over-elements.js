///<reference types="Cypress" />

describe("Iterate over elements", () => {
  it("Log information of all Haircare products", () => {
    cy.visit("https://automationteststore.com/");
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    cy.get(".fixed_wrapper .prdocutname").each(($el) => {
      cy.log($el.text() + ".");
    });
  });

  it.only("Add specific product to basket", () => {
    cy.visit("https://automationteststore.com/");
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    cy.get(".fixed_wrapper .prdocutname").each(($el) => {
      if ($el.text() === "Curls to straight Shampoo") {
        cy.wrap($el).click();
      }
    });
  });
});
