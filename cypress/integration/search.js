
describe('Search ', () => {

    it('Search product not brands', () => {
      cy.request({
          method:'GET',
          url:Cypress.config().urlSearch,
          qs:{
              'query': 'pizza'
            },
          headers: {
            'x-app-id':Cypress.config().appId, 
            'x-app-key': Cypress.config().appKey,
            "content-type":Cypress.config().ContentType
         },
         response:'fixture:response.json'
      }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).not.to.be.null
                expect(response.body).not.to.have.keys('branded')
            }).its('body')
             .its('common').each((value) =>{
                expect(value).to.have.all.keys('food_name', 'serving_unit','tag_name',
                'serving_qty','common_type',
                'tag_id','photo','locale')
                expect(value.food_name).to.contain('pizza')
                })
                
    })


    it('Search product with brands', () => {
        cy.request({
            method:'GET',
            url:Cypress.config().urlSearch,
            qs:{
                'query': 'chesse',
                'branded': true,
                'common':false
              },
            headers: {
              'x-app-id':Cypress.config().appId, 
              'x-app-key': Cypress.config().appKey,
              "content-type":Cypress.config().ContentType
           },
           response:'fixture:response.json'
        }).then((response)=>{
                  expect(response.status).to.eq(200)
                  expect(response.body).not.to.be.null
                  expect(response.body).to.have.keys('branded')
                  expect(response.body).to.not.have.keys('common')
              }).its('body')
               .its('branded').each((value) =>{
                  expect(value).to.have.all.keys('food_name', 'serving_unit','nix_brand_id',
                  'brand_name_item_name','serving_qty','brand_name','region','brand_type','nix_item_id',
                  'nf_calories','photo','locale')
                  })
    })

    it('Search item', () => {
        cy.request({
            method:'GET',
            url:Cypress.config().urlSearchItem,
            qs:{
                'nix_item_id': '513fc9e73fe3ffd40300109f'
              },
            headers: {
              'x-app-id':Cypress.config().appId, 
              'x-app-key': Cypress.config().appKey,
              "content-type":Cypress.config().ContentType
           },
           response:'fixture:response.json'
        }).then((response)=>{
                  expect(response.status).to.eq(200)
                  expect(response.body).not.to.be.null
                  expect(response.body).to.have.keys('foods')
              }).its('body')
               .its('foods').should('have.length',1)
               .each((value) =>{
                  expect(value).to.have.any.keys('food_name', 'serving_unit','nix_brand_id',
                  'brand_name_item_name','serving_qty','brand_name','region','brand_type','nix_item_id',
                  'nf_calories','photo','locale')
                  expect(value.brand_name).to.contains("McDonald's")
                  })
    })
  })