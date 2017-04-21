var gulp = require('gulp');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
gulp.task('default', function() {
    gulp.src('src/*.js')
	.pipe(browserify())
    .pipe(minify())
	.pipe(gulp.dest('build'));
 });
gulp.task('test', function() {
    gulp.src('test/*.js')
        .pipe(browserify())
        .pipe(minify())
        .pipe(gulp.dest('build'));
});
gulp.task('product', function() {
    gulp.src('product/*.js')
        .pipe(browserify())
        .pipe(minify())
        .pipe(gulp.dest('build'));
});
gulp.task('bridge', function() {
    gulp.src('bridge/*.js')
        .pipe(browserify())
        .pipe(minify())
        .pipe(gulp.dest('build'));
});
gulp.task('plugins', function() {
    gulp.src('widget-plugins/*.js')
        .pipe(browserify())
        .pipe(minify())
        .pipe(gulp.dest('build'));
});