///<reference types="Cypress" />

describe("Alias and invoke", () => {
  it("Validate specific product", () => {
    cy.visit("https://automationteststore.com/");
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    cy.contains("Conditioner").click({ force: true });
    cy.get(".fixed_wrapper .prdocutname")
      .eq(0)
      .invoke("text")
      .as("productThumbnail");
    cy.get("@productThumbnail").its("length").should("be.gt", 5);
    cy.get("@productThumbnail").should("include", "Seaweed Conditioner");
  });

  it("validate number of product", () => {
    cy.visit("https://automationteststore.com/");
    cy.get(".thumbnail").as("products");
    cy.get("@products").should("have.length", 16);
    cy.get("@products")
      .find(".productcart")
      .invoke("attr", "title")
      .should("include", "Add to Cart");
  });

  it.only("Calculate total of normal and sale products", () => {
    cy.visit("https://automationteststore.com/");
    cy.get(".thumbnail").as("products");
    // cy.get("@products")
    //   .find(".oneprice")
    //   .each(($el) => {
    //     cy.log($el.text());
    //   });

    cy.get("@products").find(".oneprice").invoke("text").as("itemPrice");
    cy.get("@products").find(".pricenew").invoke("text").as("saleItemPrice");

    let itemsTotal = 0;
    cy.get("@itemPrice").then(($item) => {
      let itemPriceTotal = 0;
      let itemPrice = $item.split("$");
      itemPrice.forEach((singlePrice) => {
        itemPriceTotal += Number(singlePrice);
      });
      itemsTotal += itemPriceTotal;
    });

    cy.get("@saleItemPrice")
      .then(($item) => {
        let salePriceTotal = 0;
        let itemPrice = $item.split("$");
        itemPrice.forEach((singlePrice) => {
          salePriceTotal += Number(singlePrice);
          cy.log(singlePrice);
        });
        itemsTotal += salePriceTotal;
      })
      .then(() => {
        cy.log(itemsTotal);
        expect(itemsTotal).to.equal(648.5);
      });
  });
});
