describe('Rating tests', () => {

    beforeEach(function () {
        cy.fixture('forumInfo.json').as('testData')
        cy.fixture('loginInfo.json').as('testDataUser')
        cy.visit(Cypress.env('url'))
    })

    it('Create forum game', function () {
        cy.get('[id="Login"]').should('be.visible').click()
        cy.get('[id="email"]').should('be.visible').type(this.testDataUser.email)
        cy.get('[id="password"]').should('be.visible').type(this.testDataUser.password)
        cy.get('button').contains("Log in").should('be.visible').click()
        cy.wait(500)
        cy.get('[id="Forums"]').should('be.visible').click()
        cy.get('[data-testid="BtnCreateForum"]').should('be.visible').click()
        cy.get('[data-testid="titleForum"]').should('be.visible').type(this.testData.title)
        cy.get('[data-testid="descriptionForum"]').should('be.visible').type(this.testData.description)
        cy.get('[data-testid="selectTag"]').should('be.visible').click()
        cy.get('[data-testid="menuItemTagGaming"]').should('be.visible').contains('Gaming').click()
        cy.get('[data-testid="formControlGame"]').should('be.visible').click()
        cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click();
        cy.get('[data-testid="buttonFilled"]').should('be.visible').click()

    })

    it('Delete forum game', function () {
        cy.get('[id="Login"]').should('be.visible').click()
        cy.get('[id="email"]').should('be.visible').type(this.testDataUser.email)
        cy.get('[id="password"]').should('be.visible').type(this.testDataUser.password)
        cy.get('button').contains("Log in").should('be.visible').click()
        cy.wait(500)
        cy.get('[id="Forums"]').should('be.visible').click()
        cy.get('[data-testid="btnEnterForum"]').eq(2).click()
        cy.get('[data-testid="btnDeleteForum"]').should('be.visible').click()
        cy.get('[data-testid="confirmButton"]').should('be.visible').click()
    })


})