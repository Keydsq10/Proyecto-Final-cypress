import user from '../fixtures/user.json'
// Datos de prueba obtenidos desde el fixture book.json
const book = require('../fixtures/book.json')

describe('Casos de prueba de APIs', () => {

    it('API | Comprar carrito exitosamente', () => {
    cy.log(user.token)
    cy.postCheckOutAPI(user.userId, user.token, 200)
    })

    it('API | Error al comprar carrito sin token', () => {
        cy.postCheckOutAPI(user.userId, '', 401)
    })

    it('API | Obtener libro existente exitosamente | Key De Sousa', () => {
        cy.getBookAPI(book.bookId, 200)
    }) // Consulto por un libro existente utilizando el ID almacenado en el fixture


    it('API | Error al obtener libro inexistente | Key De Sousa', () => {
        cy.getBookAPI(999999, 404)
    })  // Consulto un ID inexistente para validar la respuesta de error

    it('API | Compra exitosa con múltiples libros | Vanesa Gonzalez', () => {
        cy.postCheckOutMultipleBooksAPI(
            user.userId,
            user.token,
            200
        )
    })
    
    it('API | Error al comprar carrito sin body | Vanesa Gonzalez', () => {
        cy.postCheckOutWithoutBodyAPI(
            user.userId,
            user.token,
            500
        )
    })
    
    it('API | Iniciar sesión exitosamente | Ciro Brito', () => {
        cy.postLoginAPI(user.name, user.password, 200)
    })

    it('API | Error al iniciar sesión con datos en blanco | Ciro Brito', () => {
        cy.postLoginAPI(user.blankName, user.blankPassword, 401)
    })

    it('API | Caso de Prueba | Nombre de alumno', () => {
    })

    it('API | Caso de Prueba | Nombre de alumno', () => {
    })
})
