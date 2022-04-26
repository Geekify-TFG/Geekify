describe('Rating tests', () => {

    beforeEach(function () {
        cy.fixture('collectionInfo.json').as('testData')
        cy.fixture('loginInfo.json').as('testDataUser')
        cy.visit(Cypress.env('url'))
    })

    it('Rate game', function () {
        cy.get('[id="Login"]').should('be.visible').click()
        cy.get('[id="email"]').should('be.visible').type(this.testDataUser.email)
        cy.get('[id="password"]').should('be.visible').type(this.testDataUser.password)
        cy.get('button').contains("Log in").should('be.visible').click()
        cy.wait(500)
        cy.get('[id="Home"]').should('be.visible').click()
        cy.window().scrollTo('bottom')
        cy.wait(1000)
        cy.get('[data-testid="gameCard"]').contains("Destiny 2").click()
        cy.get('[data-testid="rating"]').first().click({force: true})

    })

})