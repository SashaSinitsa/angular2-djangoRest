describe('Catalog', () => {

  beforeEach( () => {
    browser.get('/catalog');
  });

  it('should have correct md-input', () => {
    expect(element(by.css('sd-catalog .container-top md-input')).isPresent()).toEqual(true);
  });

});
