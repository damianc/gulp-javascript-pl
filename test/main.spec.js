var should = require('should');
var fs = require('fs');
var es = require('event-stream');
var File = require('vinyl');
var gutil = require('gulp-util');
var jspl = require('../src/index');
var {spawn} = require('child_process');

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
		var assertions = [
			{
				passed: 'nietoperz',
				expected: 'nietoperz'
			},
			{
				passed: 'nie-toper(z)',
				expected: 'false-toper(with)'
			},
			{
				passed: 'stała E = 2.7183;',
				expected: 'const E = 2.7183;'
			},
			{
				passed: 'stala E = 2.7183;',
				expected: 'stala E = 2.7183;'
			},
			{
				passed: 'ZM f = Funkcja () {};',
				expected: 'var f = function () {};'
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

	var externalFiles = fs.readdirSync('test/expected-js');
	externalFiles.forEach(function (externalFile) {
		(function (file) {
			var assertionDescription = `should transpile ${file} file`;
			it(assertionDescription, function (done) {
				externalTester(`test/expected-js/${file}`, `test/produced-js/${file}`, done);
			});
		})(externalFile);
	});
});

