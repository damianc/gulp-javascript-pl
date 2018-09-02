var gulp = require('gulp');
var clean = require('gulp-clean');
var jspl = require('../src/index');

/**
 * Clean generated JS files.
 */
gulp.task('clean', function () {
	return gulp.src('produced-js', {read: false})
	    .pipe(clean({force: true}));
});

/**
 * Compile .jspl files to JS.
 */
gulp.task('jspl', function () {
	return gulp.src('given-jspl/*.jspl')
	    .pipe(jspl())
	    .pipe(gulp.dest('produced-js'));
});
