var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jspl = require('../index');

/**
 * Clean generated JS files.
 */
gulp.task('clean', function () {
	gulp.src('produced', {read: false})
	    .pipe(clean({force: true}));
});

/**
 * Compile .jspl files to JS.
 */
gulp.task('jspl', function () {
	gulp.src('jspl/*.jspl')
	    .pipe(jspl())
	    .pipe(gulp.dest('produced'));
});