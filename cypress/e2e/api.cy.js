import user from '../fixtures/user.json'
const book = require('../fixtures/book.json')

describe('Casos de prueba de APIs', () => {

    it('API | Comprar carrito exitosamente', () => {
        cy.postCheckOutAPI(user.userId, user.token, 200)
    })

    it('API | Error al comprar carrito sin token', () => {
        cy.postCheckOutAPI(user.userId, '', 401)
    })

    it.only('API | Obtener libro existente exitosamente | Key De Sousa', () => {
        cy.getBookAPI(book.bookId, 200)
    })

    it('API | Error al obtener libro inexistente | Key De Sousa', () => {
        cy.getBookAPI(999999, 404)
    })

})
