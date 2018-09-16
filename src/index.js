var through = require('through2');
var gutil = require('gulp-util');

const PLUGIN_NAME = 'gulp-javascript-pl';

var jspl = function (lang = 'pl') {
    var stream = through.obj(function (file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            let vocabPath = (lang == 'pl') ? './vocab' : `./lang/${lang}.js`;
            let vocab = require(vocabPath);

            let fileContent = file.contents.toString('utf8');
            let vocabList = Object.keys(vocab).join('|');
            let reKeywords = new RegExp('(?<!\\w)(' + vocabList + ')(?!\\w)(?=(?:[^"\\\\]*(?:\\\\.|"(?:[^"\\\\]*\\.)*[^"\\\\]*"))*[^"]*$)', 'gi');

            let jsFileContent = fileContent.replace(reKeywords, function (keyword) {
                return vocab[keyword.toLowerCase()];
            });

            file.contents = Buffer.from(jsFileContent);
            file.path = gutil.replaceExtension(file.path, '.js');
        }

        this.push(file);
        cb();
    });

    return stream;
};

module.exports = jspl;
