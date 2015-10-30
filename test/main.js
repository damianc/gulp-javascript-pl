var should = require('should'),
    fs = require('fs'),
    jspl = require('../index');

after(function () {
	console.log('\t TESTS GOT FINISHED ');
});

describe('compiled js files', function () {
	it('should have two variables a = 1 and b = 2', function () {
        fs.readFile('test/expected/vars.js', 'utf8', function (err, data) {
        	if (err) return console.log(err);
        	data.should.be.equal();
        });
	});
});