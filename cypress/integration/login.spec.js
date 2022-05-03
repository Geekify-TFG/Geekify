
describe('Login and sign in tests', () => {

    beforeEach(function () {
        cy.fixture('loginInfo.json').as('testData')
        cy.visit(Cypress.env('url'))
    })

   it('Register with user created', function () {
       cy.get('[id="Sign up"]').should('be.visible').click()
       cy.get('[id="name"]').should('be.visible').type(this.testData.takenname)
       cy.get('[id="email"]').should('be.visible').type(this.testData.takenemail)
       cy.get('[id="password"]').should('be.visible').type(this.testData.takenpassword)
       cy.get('[id="repeatPassword"]').should('be.visible').type(this.testData.takenpassword)
       cy.get('[id="privacyCheck"]').should('be.visible').click()
       cy.get('button').contains('Sign up').should('be.visible').click()
       cy.get('[id="alert"]').should('be.visible', {timeout: 30000})
    })

    /*it('Register with wrong email', function () {
        cy.get('[id="Sign up"]').should('be.visible').click()
        cy.get('[id="name"]').should('be.visible').type(this.testData.name)
        cy.get('[id="email"]').should('be.visible').type(this.testData.wrongemail)
        cy.get('[id="password"]').should('be.visible').type(this.testData.password)
        cy.get('[id="repeatPassword"]').should('be.visible').type(this.testData.password)
        cy.get('[id="privacyCheck"]').should('be.visible').click()
        cy.get('button').contains('Sign up').should('be.visible').click()
    })*/

    it('Registrar un usuario', function() {
        cy.get('[id="Sign up"]').should('be.visible').click()
        cy.get('[id="name"]').should('be.visible').type(this.testData.name)
        cy.get('[id="email"]').should('be.visible').type(this.testData.email)
        cy.get('[id="password"]').should('be.visible').type(this.testData.password)
        cy.get('[id="repeatPassword"]').should('be.visible').type(this.testData.password)
        cy.get('[id="privacyCheck"]').should('be.visible').click()
        cy.get('button').contains('Sign up').should('be.visible').click()
    })

    it('Log in de un usuario ya creado', function () {
        cy.get('[id="Login"]').should('be.visible').click()
        cy.get('[id="email"]').should('be.visible').type(this.testData.email)
        cy.get('[id="password"]').should('be.visible').type(this.testData.password)
        cy.get('button').contains("Log in").should('be.visible').click()
        cy.get('[id="myProfile"]').should('be.visible', {timeout: 30000})
    })


})