'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:8080",
        port: 3000
    });
});

gulp.task('sass', function(){
    gulp.src('client/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    gulp.src('client/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('views', function() {
    gulp.src('client/**/*.html')
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function(){
    gulp.watch('client/**/*.js', ['scripts']);
    gulp.watch('client/**/*.html', ['views']);
    gulp.watch(['client/sass/**/*.scss', 'client/sass/*.scss'], ['sass']);
});

gulp.task('default', ['browser-sync', 'scripts', 'views', 'sass', 'watch']);
