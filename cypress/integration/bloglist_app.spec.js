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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'MosHaz', password: '123456' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Fast, easy and reliable testing for anything that runs in a browser.')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cypress.io')
      cy.get('button[type=submit]').click()

      cy.contains('Fast, easy and reliable testing for anything that runs in a browser.')
      cy.contains('cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title:'End-to-end Testing Mobile Apps with Ionic and Cypress.',
          author:'Cecelia Martinez',
          url:'www.cypress.io/blog/'
        })
        cy.createBlog({
          title:'Test your code, not your patience.',
          author:'Cypress',
          url:'https://www.cypress.io'
        })
      })

      it('user can like a blog', function () {
        cy.contains('Martinez').parent().find('button').click()
        cy.contains('like').click()

        cy.contains('like').parent().should('contain', 1)
      })

      it('the user who created a blog can delete it.', function () {
        cy.get('.blog-title').should('have.length', 2)

        cy.contains('Test your code').parent().find('button').click()
        cy.get('.blog-details').within( () => {
          cy.get('button').then( buttons => {
            cy.wrap(buttons[1]).click()
          })
        })

        cy.get('.blog-title').should('not.contain', 'Test your code, not your patience.')
      })
    })
  })
})