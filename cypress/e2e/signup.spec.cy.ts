describe('Signup Page', () => {
  beforeEach(() => {
    cy.window().then(win => {
      win.indexedDB.deleteDatabase("_ionicstorage");
    });
  });

  it('should register a new user', () => {
    cy.visit('/signup');

    cy.get('ion-input[formcontrolname="email"]').type('test@example.com');
    cy.get('ion-input[formcontrolname="name"]').type('Test User');
    cy.get('ion-input[formcontrolname="password"]').type('password123');
    cy.get('ion-input[formcontrolname="confirmPassword"]').type('password123');
    cy.get('ion-button[type="submit"]').click();

    cy.url().should('include', '/login');
  });

  it('should fail to register with mismatched passwords', () => {
    cy.visit('/signup');

    cy.get('ion-input[formcontrolname="email"]').type('test@example.com');
    cy.get('ion-input[formcontrolname="name"]').type('Test User');
    cy.get('ion-input[formcontrolname="password"]').type('password123');
    cy.get('ion-input[formcontrolname="confirmPassword"]').type('mismatchedpassword');
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');

    cy.get('ion-text.error-msg').should('be.visible');
  });
});
