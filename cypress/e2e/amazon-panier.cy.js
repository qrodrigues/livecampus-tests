describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://www.amazon.fr/')
    /* ==== Generated with Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get('#sp-cc-accept').click();
    cy.get('[href="/amazonbasics/?field-lbr_brands_browse-bin=AmazonBasics&ref_=nav_cs_amazonbasics"]').click();
    cy.get('#lq841nz29k > [data-testid="mini-editorial-tile"] > [data-testid="editorial-tile-Overlay"] > [data-testid="observer"] > .Overlay__overlay__LloCU').click();
    /* ==== End Cypress Studio ==== */
  })
})