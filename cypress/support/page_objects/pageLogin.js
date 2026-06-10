class pageLogin {

    typeUserName(name) {
        cy.get('input[formcontrolname="username"]').type(name)
    }

    typeUserPassword(password) {
        cy.get('input[formcontrolname="password"]').type(password)
    }

    clickLoginButton() {
        cy.get('app-login button').contains('Login').click()
    }

// Método agregado para tu caso individual
    verifyLoginError() {
        cy.contains('Username or Password is incorrect.').should('be.visible')

    }

} module.exports = new pageLogin();