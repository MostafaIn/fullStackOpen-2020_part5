describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name:'Mostafa Hazareh',
      username:'MosHaz',
      password:'123456'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })

  describe('LOG IN', function() {
    it('fails with wrong credentials', function() {
      cy.get('#username').type('invalid')
      cy.get('#password').type('wrong')
      cy.contains('login').click()
      cy.get('.error')
        .should('contain','wrong username or password!')
        .and('have.css', 'color' , 'rgb(139, 0, 0)')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('MosHaz')
      cy.get('#password').type('123456')
      cy.contains('login').click()
      cy.contains('Mostafa Hazareh logged in')

    })
  })
})