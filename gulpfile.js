'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task('sass', function () {
	return gulp.src('./config/scss/custom.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./config'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./config/scss/custom.scss', ['sass']);
});