class pageHome {

    isBookVisible() {
        cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    }

    clickAddToCartButton() {
        cy.get('button').contains('Add to Cart').click()
    }

    isBookVisibleInCart() {
        cy.contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    }

    clickCheckOutButton() {
        cy.contains(/checkout/i).click()
    }

    isCheckOutFormVisible() {
        cy.contains('Check Out').should('be.visible')
        cy.contains('Order Summary').should('be.visible')
    }

    completeCheckOutForm() {
        cy.get('input[formcontrolname="name"]').type('Key De Sousa')
        cy.get('input[formcontrolname="addressLine1"]').type('Av Consti')
        cy.get('input[formcontrolname="addressLine2"]').type('Piso 1')
        cy.get('input[formcontrolname="pincode"]').type('123456')
        cy.get('input[formcontrolname="state"]').type('Buenos Aires')
    }

    clickPlaceOrderButton() {
        cy.contains('Place Order').click()
    }

    isMyOrdersVisible() {
        cy.url().should('include', '/myorders')
        cy.contains('My Orders').should('be.visible')
    }

    clickFirstOrder() {
    cy.get('td.mat-column-orderId').first().click()
    }

    isOrderPurchaseVisible() {
        cy.contains('Quantity').should('be.visible')
        cy.contains('Amount Paid').should('be.visible')
    }

    clickCategory(categoryName) {
        cy.contains('span', categoryName).click()
    }

    clickBookByTitle(bookTitle) {
        cy.contains('app-book-card', bookTitle).click()
    }

    isBookDetailVisible(bookTitle, categoryName) {
        cy.contains('Book Details').should('be.visible')
        cy.contains(bookTitle).should('be.visible')
        cy.contains(categoryName).should('be.visible')
    }
    searchBook(bookName) {
        cy.get('input[placeholder="Search books or authors"]')
            .clear()
            .type(bookName)
        cy.contains('mat-option', bookName)
    }
    validateBookVisible(bookName) {
        cy.get('app-book-card')
            .contains(bookName)
            .should('be.visible')
            .click({ force: true })
    }
}

module.exports = new pageHome();