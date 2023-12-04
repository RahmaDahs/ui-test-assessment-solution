describe('Login Test - Valid Credentials-invalid credentials', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/employees.html');    
    cy.get('#button').should('contain', 'Login');  
  });

  it('should log in with valid credentials', () => {

  // Enter valid username and password
    cy.get('input[placeholder="username"]').type('rdahs'); 
    cy.get('input[placeholder="password"]').type('password'); 

    cy.get('input[value="Sign in"]').click();  
    // Verify user is logged in and redirected to the home page
    // cy.url().should('eq', 'http://localhost:8080/city.html');
       cy.get('#btn').should('contain', 'View selected data');   
  });

  it('should log in with invalid credentials', () => {

     
    // Enter valid username and password
    cy.get('input[placeholder="username"]').type('unknown'); 
    cy.get('input[placeholder="password"]').type('unknown'); 

    cy.get('input[value="Sign in"]').click();  
    // Verify the text of error message     
  });
});