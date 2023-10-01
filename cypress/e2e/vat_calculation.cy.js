beforeEach(()=>{
  let countrySelector = '.select150'
  let vatSelect12 = "label[for='VAT_12']"

  cy.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  cy.intercept('https://pagead*', req => req.destroy())
  cy.visit('https://www.calkoo.com/en/vat-calculator')
  cy.acceptCookiesModal('.cc-dismiss')
  cy.get(countrySelector).select('Sweden')
  cy.get(vatSelect12).click()
})

describe('calculate vat for a country', () => {
  let netPriceInputId = '#NetPrice'
  let vatInputId = '#VATsum'
  let priceInputId = '#Price'

  it('calculates a vat rate for a country by entering value added tax', () => {
    cy.get('#vatcalculator').find('label').contains('Value-Added Tax').click()
    cy.get(vatInputId).type('120.00')
    cy.elementShouldContainValue(netPriceInputId, '1000.00')
    cy.elementShouldContainValue(priceInputId, '1120.00')
  })

  it('calculates a vat rate for a country by entering the final price', () => {
    cy.get('#vatcalculator').find('label').contains('Price incl. VAT').click()
    cy.get(priceInputId).type('1120.00')
    cy.elementShouldContainValue(netPriceInputId, '1000.00')
    cy.elementShouldContainValue(vatInputId, '120.00')
  })

  it('calculates a vat rate for a country using maximum value', () => {
    cy.get('#vatcalculator').find('label').contains('Price without VAT').click()
    cy.get(netPriceInputId).type(999999999)
    cy.elementShouldContainValue(vatInputId, '119999999.88')
    cy.elementShouldContainValue(priceInputId, '1119999998.88')
  })

  it('negative values should throw an error', ()=>{
    cy.get(netPriceInputId).type(-100)
    cy.elementShouldContainText('#google-visualization-errors-4 span', 'Negative values are invalid for a pie chart.')
  })
})