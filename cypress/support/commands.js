// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('acceptCookiesModal', (selector, timeout = 1000, attempts = 0)=>{
    /*if (attempts > (timeout / 100)) {
        return;                                  
    }
    if (!Cypress.$(selector).length)  {        
        cy.wait(100)
        cy.acceptCookiesModal(selector, timeout, ++attempts)
    }
    else {
        Cypress.$(selector).click()
    }
    */
   cy.get(selector).click()
})

Cypress.Commands.add('elementShouldContainValue', (selector, value) =>{
    cy.get(selector).should('have.value', value)
})

Cypress.Commands.add('elementShouldContainText', (selector, text) =>{
    cy.get(selector).contains(text).should('have.length', 1)
})