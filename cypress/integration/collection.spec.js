describe('Collection tests', () => {

    beforeEach(function () {
        cy.fixture('collectionInfo.json').as('testData')
        cy.fixture('loginInfo.json').as('testDataUser')
        cy.visit(Cypress.env('url'))
    })

    it('Create collection', function () {
        cy.get('[id="Login"]').should('be.visible').click()
        cy.get('[id="email"]').should('be.visible').type(this.testDataUser.email)
        cy.get('[id="password"]').should('be.visible').type(this.testDataUser.password)
        cy.get('button').contains("Log in").should('be.visible').click()
        cy.wait(3000)
        cy.get('[id="My collections"]').should('be.visible').click()
        cy.wait(5000)
        cy.get('[data-testid="createCollection"]').should('be.visible').click()
        cy.get('[data-testid="textfieldTitle"]').should('be.visible').type(this.testData.title)
        cy.get('button').contains('Save').should('be.visible').click()
        cy.window().scrollTo('bottom')
        cy.wait(3000)
        cy.get('[data-testid="collectionCard"]').last().click()
    })

    it('Add game to collection', function () {
        cy.get('[id="Login"]').should('be.visible').click()
        cy.get('[id="email"]').should('be.visible').type(this.testDataUser.email)
        cy.get('[id="password"]').should('be.visible').type(this.testDataUser.password)
        cy.get('button').contains("Log in").should('be.visible').click()
        cy.wait(3000)
        cy.get('[id="Home"]').should('be.visible').click()
        cy.window().scrollTo('bottom')
        cy.wait(5000)
        cy.get('[data-testid="gameCard"]').contains("Destiny 2").click()
        cy.get('[data-testid="BtnAddToCollection"]').should('be.visible').click()
        cy.get('[data-testid="formControl"]').should('be.visible').click()
        cy.get('[data-testid="menuItem"]').should('be.visible').contains(this.testData.title).click()
        cy.get('button').contains('Save').should('be.visible').click()
        cy.get('[id="My collections"]').should('be.visible').click()
        cy.window().scrollTo('bottom')
        cy.wait(3000)
        cy.get('[data-testid="collectionCard"]').last().click()
        cy.get('[data-testid="gameCard"]').should('be.visible')
    })

    it('Delete collection ', function () {
        cy.get('[id="Login"]').should('be.visible').click()
        cy.get('[id="email"]').should('be.visible').type(this.testDataUser.email)
        cy.get('[id="password"]').should('be.visible').type(this.testDataUser.password)
        cy.get('button').contains("Log in").should('be.visible').click()
        cy.wait(3000)
        cy.get('[id="My collections"]').should('be.visible').click()
        cy.wait(5000)
        cy.get('[data-testid="collectionCard"]').last().click()
        cy.get('[data-testid="menuButton"]').click()
        cy.get('[data-testid="deleteOption"]').click()
        cy.get('button').contains('Delete').should('be.visible').click()

    })


})