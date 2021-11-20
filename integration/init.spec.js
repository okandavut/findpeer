describe('Cypress', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  //   it('clicks the button and opens the modal', () => {
  //     cy.get('[id=more-information-button]').first().click()
  //     cy.get('.modal').should('have.class', 'show')
  //     cy.get('[id=close-modal-button]').first().click()
  //     cy.get('.modal').not('have.class', 'show')
  //   })

  it('check search is working', () => {
    const input = 'Okan'
    cy.wait(3000)
    cy.get('[id=search-input]').type(input).should('have.value', input)
    cy.get('.card-title').first().contains('Okan')
  })
})
