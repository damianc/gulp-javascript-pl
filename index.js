var through = require('through2');
var gutil = require('gulp-util');
var vocab = require('./vocab');

const PLUGIN_NAME = 'gulp-javascript-pl';

var jspl = function () {
    var stream = through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            let fileContent = file.contents.toString('utf8');
            let vocabList = Object.keys(vocab).join('|');
            let vocabRE = new RegExp('(?<!\\w)(' + vocabList + ')(?!\\w)', 'gi');

            let js = fileContent.replace(vocabRE, function (stmt) {
                return vocab[stmt.toLowerCase()];
            });

            file.contents = new Buffer(js);
            file.path = gutil.replaceExtension(file.path, '.js');
        }

        this.push(file);
        cb();
    });

    return stream;
};

module.exports = jspl;
