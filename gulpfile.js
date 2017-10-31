var gulp = require('gulp');
var jshint = require('gulp-jshint');

var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

gulp.task('jshint', function() {
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    gulp.src(['./src/scripts/*.js'])
        .pipe(concat('all.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('styles', function() {
    gulp.src(['./src/styles/*.css'])
        .pipe(concat('styles.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/styles/'));
})

gulp.task('default', ['scripts', 'styles'], function() {
    gulp.watch('./src/scripts/*.js', function() {
        gulp.run('jshint','scripts');
    });
    gulp.watch('./src/styles/*.css', function() {
        gulp.run('styles');
    });
})
