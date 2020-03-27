/* eslint-env mocha */
describe('Nutrients ', () => {

  it('Return nutrients for breakfast', () => {
    cy.request({
        method:'POST',
        url:Cypress.config().urlNutrients,
        body: {"query":"for breakfast i ate 2 eggs, bacon, and french toast" },
        headers: {
          'x-app-id':Cypress.config().appId, 
          'x-app-key': Cypress.config().appKey,
          "content-type":Cypress.config().ContentType
       }
    }).then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body).not.to.be.null
    }).its('body').its('foods').should('have.length',3)
      
  })

})