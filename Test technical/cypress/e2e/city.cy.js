describe('If we can see the city of origin of selected employees in a list', () => {
  before(() => {
    cy.visit('http://localhost:8080/employees.html'); 
    cy.get('input[placeholder="username"]').type('rdahs'); 
    cy.get('input[placeholder="password"]').type('password'); 
    cy.get('input[value="Sign in"]').click();
   // cy.url().should('include', 'city.html'); 
  });
  beforeEach(() => {
    cy.visit('http://localhost:8080/employees.html');    
    cy.get('#button').should('contain', 'Login');  
  });

  it('should ensure the application is accessible', () => {
   
    cy.get('body').should('be.visible');
  });

  it('should navigate to the employee list and check city of origin', () => {

      // Check if the employee list is displayed without errors
       cy.get('#contenttabletreeGrid').should('be.visible');
   
  });

  it('should select and view data for a specific employee', () => {

  
   cy.get('.jqx-grid-column-header.jqx-widget-header.jqx-disableselect').find('span').contains('FirstName').then((element) => {
    expect(element).to.exist;
});
   cy.get('.jqx-grid-column-header.jqx-widget-header.jqx-disableselect').find('span').contains('LastName').then((element) => {
  expect(element).to.exist;
});
   cy.get('.jqx-grid-column-header.jqx-widget-header.jqx-disableselect').find('span').contains('Title').then((element) => {
  expect(element).to.exist;
});
    cy.get('.jqx-grid-column-header.jqx-widget-header.jqx-disableselect').find('span').contains('City').then((element) => {
  expect(element).to.exist;
});
 cy.wait(1000); 


 let cellValue;

    // Select a specific employee from the list
     cy.get('#row0treeGrid').find('.jqx-checkbox-default').click();
    // Click on the "view selected data" button
    cy.get('#btn').click();

    cy.get('#row0treeGrid > td:nth-child(4)')
    .invoke('text')
    .then((text) => {      
      cellValue = text.trim();
    }).then(() =>
     { 
      cy.log(`The cell value is: ${cellValue}`);
       // Verify that the selected employee data is displayed without errors
    cy.get('#listBoxSelected').should('be.visible');
    cy.get('#listBoxSelected').should('contain', 'Andrew is from '+ cellValue);
  
     });

   
  });

 it('should select and view data for multiple employees', () => {
  
    cy.get('.jqx-cell.jqx-grid-cell.jqx-item.jqx-grid-cell-nowrap').first().find('.jqx-checkbox-default').click();
    cy.get('.jqx-cell.jqx-grid-cell.jqx-item.jqx-grid-cell-nowrap').eq(1).find('.jqx-checkbox-default').click();
    cy.get('.jqx-cell.jqx-grid-cell.jqx-item.jqx-grid-cell-nowrap').eq(3).find('.jqx-checkbox-default').click();
    cy.get('.jqx-cell.jqx-grid-cell.jqx-item.jqx-grid-cell-nowrap').eq(5).find('.jqx-checkbox-default').click();
    
    cy.get('#btn').click();
    // Verify that multiple employees are selected and data is displayed without errors

    const rowIds = ['#row0treeGrid', '#row1treeGrid', '#row3treeGrid', '#row5treeGrid'];
    const cellValues = [];   
  
    rowIds.forEach((rowId) => {
      cy.get(`${rowId} > td:nth-child(4)`)
        .invoke('text')
        .then((text) => {
          cellValues.push(text.trim());
        });
    });
      
    cy.then(() => {
    
      cellValues.forEach((value, index) => {
        cy.get('#listBoxSelected').should('contain', 'is from '+cellValues[index]);
      });
      
    });   

    cy.get('.jqx-listitem-element').should('have.length', 4);
  });

  it('should resize the browser window to various dimensions', () => {
 
    cy.viewport(800, 600);
    cy.get('.jqx-grid-column-header.jqx-widget-header.jqx-disableselect').find('span').contains('city').should('not.be.hidden');
    cy.viewport(375, 667);
    cy.get('.jqx-grid-column-header.jqx-widget-header.jqx-disableselect').find('span').contains('city').should('not.be.hidden');
     }); 

  after(() => {  });
});
