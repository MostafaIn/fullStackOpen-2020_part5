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

  describe('When logged in', function() {
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
          url:'www.cypress.io/blog/',
          likes: 10
        })
        cy.createBlog({
          title:'Test your code, not your patience.',
          author:'Cypress',
          url:'https://www.cypress.io',
          likes: 15
        })
        cy.createBlog({
          title:'When Can The Test Log Out?',
          author:'Gleb Bahmutov',
          url:'https://www.cypress.io',
          likes: 25
        })
        cy.createBlog({
          title:'Live Webcast | Build invincible integration tests using Cypress and cypress-testing-library',
          author:'The Cypress Team',
          url:'https://www.cypress.io',
          likes: 5
        })
        cy.createBlog({
          title:'Experimental Fetch Polyfill',
          author:'Gleb Bahmutov',
          url:'https://www.cypress.io',
          likes: 20
        })

      })

      it('user can like a blog', function () {
        cy.contains('Martinez').parent().find('button').click()
        cy.contains('like').click()

        cy.contains('like').parent().should('contain', 11)
      })

      it('the user who created a blog can delete it.', function () {
        cy.get('.blog-title').should('have.length', 5)

        cy.contains('Test your code').parent().find('button').click()
        cy.get('.blog-details').within( () => {
          cy.get('button').then( buttons => {
            cy.wrap(buttons[1]).click()
          })
        })

        cy.get('.blog-title').should('not.contain', 'Test your code, not your patience.')
      })

      it('blogs are ordered according to likes with the blog with the most likes being first.', function () {
        cy.get('.blog-title').then( blogs => {
          for(let blog of blogs){
            cy.get(blog).parent().find('button').click()

          }
        })
        cy.get('.blog-details').then( blogs => {
          cy.wrap(blogs[0]).should('contain', 25)
          cy.wrap(blogs[1]).should('contain', 20)
          cy.wrap(blogs[2]).should('contain', 15)
          cy.wrap(blogs[3]).should('contain', 10)
          cy.wrap(blogs[4]).should('contain', 5)
        })
      })
    })
  })
})