var chai = require('chai');
var expect = chai.expect;
var word = require('./test/index');

describe('Sanitize', function(){
	it('returns lowercase of string.', function(){
		var inputWord = 'hello world';
		var outputWord = word.sanitize(inputWord);

		expect(outputWord).to.equal('hello world');
		expect(outputWord).to.not.equal('HELLO WORLD');
		expect(outputWord).to.be.a('string');
		expect(outputWord).to.not.be.a('number');
		expect(outputWord).to.contain('hello');
	});
	it('removes any hyphen.');
});