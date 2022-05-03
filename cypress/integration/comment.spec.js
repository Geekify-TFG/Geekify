describe('Comments tests', () => {

    beforeEach(function () {
        cy.fixture('collectionInfo.json').as('testData')
        cy.fixture('loginInfo.json').as('testDataUser')
        cy.visit(Cypress.env('url'))
    })

    it('Comment game', function () {
        cy.get('[id="Login"]').should('be.visible').click()
        cy.get('[id="email"]').should('be.visible').type(this.testDataUser.email)
        cy.get('[id="password"]').should('be.visible').type(this.testDataUser.password)
        cy.get('button').contains("Log in").should('be.visible').click()
        cy.wait(3000)
        cy.get('[id="Home"]').should('be.visible').click()
        cy.window().scrollTo('bottom')
        cy.wait(3000)
        cy.get('[data-testid="gameCard"]').contains("Destiny 2").click()
        cy.get('[data-testid="textfieldComment"]').should('be.visible').type("Good game")
        cy.get('[data-testid="postComment"]').should('be.visible').click()
        cy.wait(3000)
        cy.window().scrollTo('bottom')
        cy.get('[data-testid="commentCard"]').should('be.visible').contains("Good game")

    })

})