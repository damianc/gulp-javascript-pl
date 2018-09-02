var should = require('should');
var fs = require('fs');
var es = require('event-stream');
var File = require('vinyl');
var gutil = require('gulp-util');
var jspl = require('../index');
var {spawn} = require('child_process');

var {spawn} = require('child_process'); // Spawn NPM asynchronously
// var child = spawn('gulp', ['jspl'], { stdio: 'inherit', shell: true , cwd: 'test/'});
// child.on('close', () => console.log('closed'));

var tester = function (jsplString, pureJsString, done) {
    var fakeFile = new File({
        contents: new Buffer(jsplString),
        path: '-path-of-fake-file.jspl'
    });

    var jsplPlugin = jspl();
    jsplPlugin.write(fakeFile);
    jsplPlugin.once('data', function (file) {
        var fileContent = file.contents.toString('utf8');

		fileContent.should.be.equal(pureJsString);
		done();
	});
};

after(function () {
	console.log('\t TESTS GOT FINISHED');
});

describe('-- NESTED SNIPPETS', function () {
	/**
	 * Make sure vocab being a part of a word (instead of standalone statement) remains untouched.
	 * For example, sno-w-ball should not be turned into sno-in-ball.
	 *
	 * Make sure latina letter will not be taken in place of Polish one.
	 * For example, stala should not be turned into const since its Polish equivalent is stała.
	 *
	 * Make sure a statement will be matched no matter of case.
	 * For example, Funkcja should be turned into function as well as funkcja or FunKcja.
	 */
	describe('Proper statement replacing', function () {
		it('should turn `nietoperz` into `nietoperz`', function (done) {
			tester('nietoperz', 'nietoperz', done);
		});

		it('should turn `nie-toper(z)` into `false-toper(with)`', function (done) {
			tester('nie-toper(z)', 'false-toper(with)', done);
		});

		it('should turn `stała E = 2.7183;` into `const E = 2.7183;`', function (done) {
			tester('stała E = 2.7183;', 'const E = 2.7183;', done);
		});

		it('should turn `stala E = 2.7183;` into `stala E = 2.7183;`', function (done) {
			tester('stala E = 2.7183;', 'stala E = 2.7183;', done);
		});

		it('should turn `ZM f = Funkcja () {};` into `var f = function () {};`', function (done) {
			tester('ZM f = Funkcja () {};', 'var f = function () {};', done);
		});
	});

	describe('Proper translating JavaScript PL into JavaScript', function () {
		var assertions = [
			{
				passed: '(tak || nie) && (prawda || fałsz)',
				expected: '(true || false) && (true || false)'
			},
			{
				passed: 'jeśli (tak) { jeżeli (prawda) {}}',
				expected: 'if (true) { if (true) {}}'
			},
			{
				passed: 'przez (zm i = 1; i <= 3; console.log(i++));',
				expected: 'for (var i = 1; i <= 3; console.log(i++));'
			},
			{
				passed: 'zm sum = funkcja (a, b) { zwróć a + b; };',
				expected: 'var sum = function (a, b) { return a + b; };'
			},
			{
				passed: 'generator snowball() { zm a = 1; dostarcz a++; }',
				expected: 'function* snowball() { var a = 1; yield a++; }'
			},
			{
				passed: 'funkcja func() { zwróć "funkcja \"func\""; }',
				expected: 'function func() { return "funkcja \"func\""; }'
			}
		];
		
		assertions.forEach(function (assertion) {
			(function (assertionItem) {
				var assertionDescription = 'should turn ' + assertionItem.passed + ' into ' + assertionItem.expected;
				it(assertionDescription, function (done) {
					tester(assertionItem.passed, assertionItem.expected, done);
				});
			})(assertion);
		});
	});
});



describe('-- SOURCE FILES', function () {
	before(function (done) {
		var child = spawn('gulp', ['jspl'], { stdio: 'inherit', shell: true , cwd: 'test/'});
		child.on('close', () => done());
	});

	after(function (done) {
		var child = spawn('gulp', ['clean'], { stdio: 'inherit', shell: true , cwd: 'test/'});
		child.on('close', () => done());
	});

	it('should be 3', function () {
		(1+2).should.be.equal(3);
	});
});

