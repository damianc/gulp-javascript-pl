var should = require('should');
var fs = require('fs');
var es = require('event-stream');
var File = require('vinyl');
var gutil = require('gulp-util');
var jspl = require('../src/index');
var {spawn} = require('child_process');
var path = require('path');

// Function to test an embedded code.
var internalTester = function (jsplString, pureJsString, done) {
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

// Function to test an external code.
function externalTester(expectedFileName, producedFileName, done) {
	var filesContent = {};
	var expectedFile = fs.readFile(expectedFileName, 'utf8', compare.bind({which: 'expected'}));
	var producedFile = fs.readFile(producedFileName, 'utf8', compare.bind({which: 'produced'}));

	function compare(err, data) {
		if (err) throw err;
		filesContent[this.which] = data.trim();

		let expectedContent, producedContent;
		if ((expectedContent = filesContent.expected) && (producedContent = filesContent.produced)) {
			expectedContent.should.be.equal(producedContent);
			done();
		}
	}
}

after(function () {
	console.log('\t TESTS GOT FINISHED');
});

describe('# INTERNAL CODE', function () {
	describe('Proper statement replacing', function () {
		it('should turn `nietoperz` into `nietoperz`', function (done) {
			internalTester('nietoperz', 'nietoperz', done);
		});

		it('should turn `nie-toper(z)` into `false-toper(with)`', function (done) {
			internalTester('nie-toper(z)', 'false-toper(with)', done);
		});

		it('should turn `stała E = 2.7183;` into `const E = 2.7183;`', function (done) {
			internalTester('stała E = 2.7183;', 'const E = 2.7183;', done);
		});

		it('should turn `stala E = 2.7183;` into `stala E = 2.7183;`', function (done) {
			internalTester('stala E = 2.7183;', 'stala E = 2.7183;', done);
		});

		it('should turn `ZM f = Funkcja () {};` into `var f = function () {};`', function (done) {
			internalTester('ZM f = Funkcja () {};', 'var f = function () {};', done);
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
					internalTester(assertionItem.passed, assertionItem.expected, done);
				});
			})(assertion);
		});
	});
});

describe('# EXTERNAL CODE', function () {
	var spawnCommonOpts = {
		stdio: 'inherit',
		shell: true,
		cwd: 'test/'
	};

	before(function (done) {
		var child = spawn('gulp', ['jspl'], spawnCommonOpts);
		child.on('close', () => done());
	});

	after(function (done) {
		var child = spawn('gulp', ['clean'], spawnCommonOpts);
		child.on('close', () => done());
	});

	var assertions = [
		{
			expectedFileName: 'test/expected-js/vars.js',
			producedFileName: 'test/produced-js/vars.js',
		},
		{
			expectedFileName: 'test/expected-js/func.js',
			producedFileName: 'test/produced-js/func.js',
		},
		{
			expectedFileName: 'test/expected-js/conds.js',
			producedFileName: 'test/produced-js/conds.js',
		}
	];

	assertions.forEach(function (assertion) {
		(function (assertionItem) {
			var assertionDescription = 'should transpile ' + path.basename(assertionItem.expectedFileName) + ' file';
			it(assertionDescription, function (done) {
				externalTester(assertionItem.expectedFileName, assertionItem.producedFileName, done);
			});
		})(assertion);
	});
});

