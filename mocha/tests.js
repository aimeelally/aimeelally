import CamelService from '../src/services/CamelService.js';
var test = window.unitjs;
describe('CamelService', function(){
  it('Return an array containing a function', function(){
    test.assert(typeof CamelService[0] === 'function');
  });

  it('Should strip simple html', function(){
    var service = CamelService[0]();
    var sampleHTML = '<p>this is a paragraph</p>';
    var result = service.stripHTML(sampleHTML);
    test.assert(result === 'this is a paragraph');
  });

  it('Should capitalise the first letter of a string', function(){
    var service = CamelService[0]();
    var sampleString = 'lorem ipsum something something';
    var result = service.capitaliseFirstLetter(sampleString);
    test.assert(result === 'Lorem ipsum something something');
  });

  it('Should convert a string to camel case', function(){
    var service = CamelService[0]();
    var sampleString = 'lorem ipsum something something';
    var result = service.convertToCamelCase(sampleString);
    test.assert(result === 'loremIpsumSomethingSomething');
  });

  it('Should strip numbers from a string', function(){
    var service = CamelService[0]();
    var sampleString = 'lorem ips8um somet3hing somet6hing';
    var result = service.stripNumbers(sampleString);
    test.assert(result === 'lorem ipsum something something');
  });

  it('Should strip special characters from a string', function(){
    var service = CamelService[0]();
    var sampleString = 'lorem ips!@£$%^&*()_+-=#[]{}\'\"|<>?,./um something something';
    var result = service.stripSpecialCharacters(sampleString);
    test.assert(result === 'lorem ipsum something something');
  });
  
});

export default {};