describe('Calendar tests', () => {

    beforeEach(function () {
        cy.fixture('collectionInfo.json').as('testData')
        cy.fixture('loginInfo.json').as('testDataUser')
        cy.visit(Cypress.env('url'))
    })

    it('Save game on my Calendar', function () {
        cy.get('[id="Login"]').should('be.visible').click()
        cy.get('[id="email"]').should('be.visible').type(this.testDataUser.email)
        cy.get('[id="password"]').should('be.visible').type(this.testDataUser.password)
        cy.get('button').contains("Log in").should('be.visible').click()
        cy.wait(3000)
        cy.get('[id="Release Calendar"]').should('be.visible').click()
        cy.wait(5000)
        cy.get('[data-testid="ButtonKey"]').contains("My calendar").click()
        cy.wait(3000)
        cy.get('[data-testid="calendarCard"]').contains("Diablo: Immortal").click()
    })

})