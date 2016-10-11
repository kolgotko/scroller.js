var gulp = require('gulp');
var concat = require('gulp-concat');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var notify = require("gulp-notify");

gulp.task('default', ['concat', 'jsmin']);

gulp.task('concat', function () {

	return gulp.src(['./src/scroller.js', './src/*.js'])
		.pipe(concat('scroller.js'))
		.pipe(gulp.dest('./'));

});

gulp.task('jsmin', function () {

	return gulp.src(['./src/scroller.js', './src/*.js'])
		.pipe(concat('scroller.js'))
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./'));

});

gulp.task('watch', function () {

	gulp.watch('./src/*.js', ['default']);

});
