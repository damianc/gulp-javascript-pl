var through = require('through2'),
    gutil = require('gulp-util'),
    vocab = require('./vocab');

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
            var fileContent = file.contents.toString('utf8'),
                vocabDict = vocab,
                vocabList = Object.keys(vocabDict).join('|'),
                vocabRE = new RegExp(vocabList, 'g'),
                js,
                bufferedSource;

            js = fileContent.replace(vocabRE, function (stmt) {
                return vocabDict[stmt];
            });

            bufferedSource = new Buffer(js);
            file.contents = bufferedSource;
            file.path = gutil.replaceExtension(file.path, '.js');
        }

        this.push(file);
        cb();
    });

    return stream;
};

module.exports = jspl;