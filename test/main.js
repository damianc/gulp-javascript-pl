var should = require('should'),
    fs = require('fs'),
    es = require('event-stream'),
    File = require('vinyl'),
    jspl = require('../index');

var tester = function (_jspl, _jsjs, done) {
	var fakeFile,
	    JP;

	fakeFile = new File({
        contents: new Buffer(_jspl),
        path: '-path-of-fake-file.jspl'
    });

    JP = jspl();
    JP.write(fakeFile);
    JP.once('data', function (file) {
        var c = file.contents.toString('utf8');
        c.should.be.equal(_jsjs);
        done();
    });
};

after(function () {
	console.log('\t TESTS GOT FINISHED ');
});

describe('-- NESTED SNIPPETS', function () {
	/*
	 * Make sure vocab being a part of a word (instead of standalone statement) remains untouched.
	 * For example, sno-w-ball should not be turned into sno-in-ball.
	 */
	describe('Proper statement replacing', function () {
	    it('should turn `nietoperz` into `nietoperz`', function (done) {
		    tester('nietoperz', 'nietoperz', done);
	    });

	    it('should turn `nie-toper(z)` into `false-toper(with)`', function (done) {
		    tester('nie-toper(z)', 'false-toper(with)', done);
	    });

	    it('should turn `stała E = 2.7183;` into `const E = 2.7183;`', function (done) {
	    	tester('stała E = 2.7183;', 'const E = 2.7183;', done)
	    });

	    it('should turn `stala E = 2.7183;` into `stala E = 2.7183;`', function (done) {
	    	tester('stala E = 2.7183;', 'stala E = 2.7183;', done);
	    });

	    it('should turn `ZM f = Funkcja () {};` into `var f = function () {};`', function (done) {
	    	tester('ZM f = Funkcja () {};', 'var f = function () {};', done);
	    });
	});

	describe('Proper translating JavaScript PL into JavaScript', function () {
	    it('should turn `(tak || nie) && (prawda && fałsz)` into `(true || false) && (true || false)`', function (done) {
            tester('(tak || nie)', '(true || false)', done);
	    });

	    it('should turn `generator snowball() { zm a = 1; dostarcz a++; }` into `function* snowball() { var a = 1; yield a++; }`', function (done) {
		    tester('generator snowball() { zm a = 1; dostarcz a++; }', 'function* snowball() { var a = 1; yield a++; }', done);
	    });
    });
});