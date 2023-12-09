describe('Login Page', () => {
  beforeEach(() => {
    cy.window().then(win => {
      win.indexedDB.deleteDatabase("_ionicstorage");
    });
  });

  it('should fail to login with incorrect credentials', () => {
    cy.visit('/login');

    cy.get('ion-input[formcontrolname="email"]').type('incorrect');
    cy.get('ion-input[formcontrolname="password"]').type('Password123');
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');

    cy.get('ion-text.error-msg').should('be.visible');

    cy.reload();

    cy.get('ion-input[formcontrolname="email"]').type('no-password@fake.com');
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
  });

  it('should login successfully', () => {
    cy.visit('/login');

    cy.get('ion-input[formcontrolname="email"]').type('test@example.com');
    cy.get('ion-input[formcontrolname="password"]').type('Password123');
    cy.get('ion-button[type="submit"]').click();

    cy.url().should('include', '/tabs');
  });

});
