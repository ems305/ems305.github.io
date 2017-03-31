var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    ''
].join('');

// Delete existing dist files
gulp.task('clean', function() {
    return del('dist/**', {force:true});
});

// Compile LESS files from styles/less into styles/css
gulp.task('less', function() {
    return gulp.src('src/styles/less/application.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('src/styles/css'))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('src/styles/css/application.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('src/scripts/application.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
});

// Concat JS and copy to dist
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('application.js'))
    .pipe(gulp.dest('dist/js'));
});

// Copy images
gulp.task('images', function() {
  return gulp.src('src/img/**')
    .pipe(gulp.dest('dist/img'));
});

// Copy static files
gulp.task('static', function() {
  return gulp.src('src/static/**')
    .pipe(gulp.dest('dist'));
});

// Copy extra files
gulp.task('extras', function() {
  return gulp.src('src/extras/**')
    .pipe(gulp.dest('dist'));
});

// Copy fonts from /node_modules into dist/fonts
gulp.task('fonts', function() {

    gulp.src('node_modules/font-awesome/css/*.min.css')
        .pipe(gulp.dest('dist/font/font-awesome/css'))

    gulp.src('node_modules/font-awesome/fonts/**')
        .pipe(gulp.dest('dist/font/font-awesome/fonts'))
})

// Run everything
gulp.task('default', function(callback) {
  runSequence('clean',
              'less',
              ['minify-css', 'minify-js'],
              ['scripts', 'images', 'static', 'extras', 'fonts'],
              callback);
});

// Deployment Settings
var deploySettings = {
  url: pkg.homepage,
  ghPages: {
    branch: 'master'
  }
}

// Deploy to github
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages(deploySettings.ghPages));
});
