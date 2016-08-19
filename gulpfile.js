'use strict';

var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templates = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');
var clean = require('gulp-clean');

var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
//var minifycss = require('gulp-clean');
var Server = require('karma').Server;

var dist = './dist';

//Check to make sure coding is up to standards
gulp.task('lint', function (){
    return gulp.src(['./src/**/*.js','!./src/client/bower_components/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

//Angular UNIT Test
gulp.task('tdd', ['lint'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

//Convert Anuglar html templates to cache
gulp.task('templates', function () {
    gulp.src(['./src/client/**/*.template.html'])
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(templates('templates.js'))
        .pipe(gulp.dest(dist));
});

// Concat and uglify all your JavaScript
gulp.task('minify-js', ['templates'], function() {
  gulp.src(['./src/client/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function (){
    gulp.src('./dist/*')
        .pipe(clean({force:true}));
});

//gulp.task('minify-css', function (){
//    var opts = {comments:true, spare:true};
//    gulp.src(['./app/**/*.css','!./app/bower_components/**'])
//        .pipe(minifycss(opts))
//        .pipe(gulp.dest('./dist/'));
//});

gulp.task('copy-bower-components', function (){
    gulp.src('./src/client/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function (){
    gulp.src('./src/client/index.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['tdd']);

gulp.task('build', ['default', 'clean', 'minify-css', 'minify-js', 'copy-bower-components', 'copy-html-files']);