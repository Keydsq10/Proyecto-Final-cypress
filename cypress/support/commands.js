const pageLogin = require('../support/page_objects/pageLogin')

Cypress.Commands.add('login', (name, password) => {
    pageLogin.typeUserName(name);
    pageLogin.typeUserPassword(password);
    pageLogin.clickLoginButton();
})

Cypress.Commands.add('deleteCartAPI', (userId) => {
    cy.request({
        method: 'DELETE',
        url: `https://app.bookdbqa.online/api/shoppingcart/${userId}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: ''
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})


Cypress.Commands.add('postCheckOutAPI', (userId, token, codeResponse) => {

    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/CheckOut/${userId}`,
        failOnStatusCode: false, // importante para que cypress no falle automaticamente ante un error 400 o 500
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token,
        },
        body:
        {
            "orderDetails": [
                {
                    "book": {
                        "bookId": 3,
                        "title": "Harry Potter and the Prisoner of Azkaban",
                        "author": "JKR",
                        "category": "Romance",
                        "price": 213,
                        "coverFileName": "c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg"
                    },
                    "quantity": 1
                }
            ],
            "cartTotal": 213
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })

})

//Caso de API | Key De Sousa
Cypress.Commands.add('getBookAPI', (bookId, codeResponse) => {

    cy.request({
        method: 'GET',
        url: `https://app.bookdbqa.online/api/Book/${bookId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })

})

//ciro:
Cypress.Commands.add('postLoginAPI', (username, password, codeResponse) => {
    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/Login`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        body: {
            "username": username,
            "password": password
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })
})

//CASO DE PRUEBA API | Compra exitosa con múltiples libros | VANESA GONZÁLEZ

Cypress.Commands.add('postCheckOutMultipleBooksAPI', (userId, token, codeResponse) => {

    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/CheckOut/${userId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token,
        },
        body:
        {
            "orderDetails": [
                {
                    "book": {
                        "bookId": 2,
                        "title": "Harry Potter and the Chamber of Secrets",
                        "author": "JKR",
                        "category": "Mystery",
                        "price": 236,
                        "coverFileName": "9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg"
                    },
                    "quantity": 1
                },
                {
                    "book": {
                        "bookId": 3,
                        "title": "Harry Potter and the Prisoner of Azkaban",
                        "author": "JKR",
                        "category": "Romance",
                        "price": 213,
                        "coverFileName": "c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg"
                    },
                    "quantity": 1
                }
            ],
            "cartTotal": 449
        }

    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })

})

//CASO DE PRUEBA | VANESA GONZALEZ
Cypress.Commands.add('postCheckOutWithoutBodyAPI', (userId, token, codeResponse) => {

    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/CheckOut/${userId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token,
        },
        body: {
            orderDetails: "dato_invalido",
            cartTotal: "dato_invalido"
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })

//Marlon
Cypress.Commands.add('loginAPI', (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://app.bookdbqa.online/api/Login',
    failOnStatusCode: false,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    },
    body: {
      username: username,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    return response.body.token
  })
})

Cypress.Commands.add('getBillingDetailsAPI', (userId, token, expectedStatus) => {

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json'
  }

  if (token) {
    headers.authorization = token
  }

  cy.request({
    method: 'GET',
    url: `https://app.bookdbqa.online/api/Billing/${userId}`,
    failOnStatusCode: false,
    headers: headers
  }).then((response) => {
    expect(response.status).to.eq(expectedStatus)
  })

})
})