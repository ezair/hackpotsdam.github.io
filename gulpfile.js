var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./vendor/font-awesome'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./vendor/jquery-easing'))

});

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './static/js/*.js',
      '!./static/js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./static/js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['js', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    open: false,
    port: 7778
  });
});

// Dev task
gulp.task('dev', ['js', 'browserSync'], function() {
  gulp.watch('./static/scss/*.scss');
  gulp.watch('./static/js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});
