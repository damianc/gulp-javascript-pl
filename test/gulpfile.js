var gulp = require('gulp');
var clean = require('gulp-clean');
var jspl = require('../index');

/**
 * Clean generated JS files.
 */
gulp.task('clean', function () {
	return gulp.src('produced', {read: false})
	    .pipe(clean({force: true}));
});

/**
 * Compile .jspl files to JS.
 */
gulp.task('jspl', function () {
	return gulp.src('jspl/*.jspl')
	    .pipe(jspl())
	    .pipe(gulp.dest('produced'));
});
