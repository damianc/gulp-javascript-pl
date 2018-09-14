var gulp = require('gulp');
var clean = require('gulp-clean');
var jspl = require('../src/index');

/**
 * Clean generated JS files.
 */
gulp.task('clean', function () {
	return gulp.src('produced-*-js', {read: false})
	    .pipe(clean({force: true}));
});

/**
 * Compile Polish .jspl files to JS.
 */
gulp.task('jspl:pl', function () {
	return gulp.src('given-polish-jspl/*.jspl')
	    .pipe(jspl())
	    .pipe(gulp.dest('produced-polish-js'));
});

/**
 * Compile French .jspl files to JS.
 */
gulp.task('jspl:fr', function () {
	return gulp.src('given-french-jspl/*.jspl')
	    .pipe(jspl('fr'))
	    .pipe(gulp.dest('produced-french-js'));
});
