describe('Amazon', () => {
  it('On accède au site web', function() {
    cy.visit('https://www.amazon.fr/');
  });

  it('chercher une tasse', function() {
    cy.visit('https://www.amazon.fr/');
    cy.get('#sp-cc-accept').click();
    cy.get('#twotabsearchtextbox').clear('T');
    cy.get('#twotabsearchtextbox').type('Tasse{enter}');
    cy.get('#nav-search-submit-button').click();
  });

  it('Retourner à la page d\'accueil', function() {
    cy.visit('https://www.amazon.fr/');
    cy.get('#sp-cc-accept').click();
    cy.get('#nav-logo-sprites').click();
  });

  it('La panier est vide à l\'intialisation de la page', function() {
    cy.visit('https://www.amazon.fr/');
    cy.get('#sp-cc-accept').click();
    cy.get('#nav-cart-count').should('have.text', '0');
  });

  it('Changer la langue en anglais', function() {
    cy.visit('https://www.amazon.fr/');
    cy.get('#sp-cc-accept').click();
    cy.get('.nav-line-2 > div').click();
    cy.get(':nth-child(6) > .a-radio > label > .a-icon').click();
    cy.get(':nth-child(6) > .a-radio > label > input').check();
    cy.get('.a-button-input').click();
  });

  it('Changer l\'adresse de livraison', function() {
    cy.visit('https://www.amazon.fr/');
    cy.get('#sp-cc-accept').click();
    cy.get('#glow-ingress-line1').click();
    cy.get('#GLUXZipUpdateInput').clear('2');
    cy.get('#GLUXZipUpdateInput').type('23000');
    cy.get('#GLUXZipUpdate > .a-button-inner > .a-button-input').click();
  });

  it('Aller à la page de connexion', function() {
    cy.visit('https://www.amazon.fr/');
    cy.get('#sp-cc-accept').click();
    cy.get('#nav-link-accountList > .nav-line-2').click();
  });
});
