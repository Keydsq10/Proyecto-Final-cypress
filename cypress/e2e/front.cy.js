import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
const pageLogin = require('../support/page_objects/pageLogin')
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')


describe('Casos de prueba de FRONT', () => {

  it('Comprar carrito exitosamente y visualizar orden de compra', () => {

    cy.deleteCartAPI(user.userId);
    cy.visit(url.login)
    cy.login(user.name, user.password);
    cy.url().should('include', url.home)
    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0')
    pageHome.clickAddToCartButton();
    cy.contains('One Item added to cart').should('be.visible')
    componentNav.validationNumberCartBadge('1')
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()
    pageHome.isBookVisibleInCart();
    pageHome.clickCheckOutButton();
    pageHome.isCheckOutFormVisible();
    pageHome.completeCheckOutForm();
    pageHome.clickPlaceOrderButton();
    pageHome.isMyOrdersVisible();
    pageHome.clickFirstOrder();
    pageHome.isOrderPurchaseVisible();

  })

  it('Filtrar libros por categoría Tech | Key De Sousa', () => {
    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)
    pageHome.clickCategory('Tech')
    pageHome.clickBookByTitle('Steve Jobs')
    pageHome.isBookDetailVisible('Steve Jobs', 'Tech')

  })

  it('Iniciar sesión con credenciales inválidas | Ciro Brito', () => {
    cy.visit(url.login)
    pageLogin.typeUserName(user.invalidName)
    pageLogin.typeUserPassword(user.invalidPassword)
    pageLogin.clickLoginButton()
    pageLogin.verifyLoginError()
  })
 
  it('Búsqueda de un libro existente | Vanesa Gonzalez', () => {
    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)
    pageHome.searchBook('Roomies')
    pageHome.validateBookVisible('Roomies')
    })

it('Validar que la interfaz no muestre el usuario sin iniciar sesión | Marlon Jaramillo', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.visit(url.login)
  cy.get('body').should('not.contain', user.name)
  cy.contains('Login').should('be.visible')
})

  //it.only ejecutar solo ese caso de prueba
  //it.skip no ejecuta ese caso de prueba
  
})