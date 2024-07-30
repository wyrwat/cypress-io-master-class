///<reference types="Cypress" />

describe('Verifying variables, cypress comands and jQuery commands', () => {
    it('Navigating to specyfic product pages', () => {
        // //Following will fail because order of execution 
        // cy.visit('https://automationteststore.com/');
        // const makeupLink = cy.get("a[href*='product/category&path=']").contains("Makeup");
        // const skincareLink = cy.get("a[href*='product/category&path=']").contains("Skincare");
        // makeupLink.click();
        // skincareLink.click();

        // //Following will work but not recomendet
        // cy.visit('https://automationteststore.com/');
        // const makeupLink = cy.get("a[href*='product/category&path=']").contains("Makeup");
        // makeupLink.click();
        // const skincareLink = cy.get("a[href*='product/category&path=']").contains("Skincare");
        // skincareLink.click();
        
        //Recomended Aprouch
        cy.visit('https://automationteststore.com/');
        cy.get("a[href*='product/category&path=']").contains("Makeup");
        cy.get("a[href*='product/category&path=']").contains("Skincare");
        
    });

    it('Navigating to specyfic product pages', () => {
        cy.visit('https://automationteststore.com/');
        cy.get("a[href*='product/category&path=']").contains("Makeup").click();
        
        //Following will fail
        // const header = cy.get("h1 .maintext");
        // cy.log(header.text())

        cy.get("h1 .maintext").then(($header) => {
            const headertext = $header.text();
            cy.log("Found Text: " + headertext);
            expect(headertext).is.eq('Makeup');
            expect(headertext).should('be.visible');
        })
    });

    it.only('Validate properties of the Contact Us Page', () => {
        cy.visit("https://automationteststore.com/index.php?rt=content/contact");
        
        //Uses cypress comands and chaing 
        cy.contains('#ContactUsFrm', 'Contact Us Form').find('#field_11').should('contain', 'First name');

        //JQuery Approach
        cy.contains('#ContactUsFrm', 'Contact Us Form').then(text => {
            const firstNameText = text.find('#field_11').text();
            expect(firstNameText).to.contain('First name');

            //Embeded commands (Closure)
            cy.get('#field_11').then(fnText => {
                cy.log(fnText.text());
                cy.log(fnText);
            })
        })
    });
});