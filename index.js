var through = require('through2');
var gutil = require('gulp-util');
var vocab = require('./vocab');

const PLUGIN_NAME = 'gulp-javascript-pl';

var jspl = function () {
    var stream;
    var fileContent;
    var vocabDict;
    var vocabList;
    var vocabRE;
    var js;
    var bufferedSource;

    stream = through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            fileContent = file.contents.toString('utf8');
            vocabDict = vocab;
            vocabList = Object.keys(vocabDict).join('|');
            vocabRE = new RegExp('\\b(' + vocabList + ')\\b', 'gi');

            js = fileContent.replace(vocabRE, function (stmt) {
                var stmt = stmt.toLowerCase();
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
