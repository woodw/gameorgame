'use strict';

var gulp = require('gulp');

var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-clean');
var Server = require('karma').Server;

gulp.task('lint', function (){
    gulp.src(['./app/**/*.js','!./app/bower_components/**'])
        .pipe(jshint({esversion:6}))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('tdd', ['lint'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('clean', function (){
    gulp.src('./dist/*')
        .pipe(clean({force:true}));
});

gulp.task('minify-css', function (){
    var opts = {comments:true, spare:true};
    gulp.src(['./app/**/*.css','!./app/bower_components/**'])
        .pipe(minifycss(opts))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-js', function (){
    gulp.src(['./app/**/*.js','!./app/bower_components/**'])
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js/map"
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-bower-components', function (){
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function (){
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['tdd']);

gulp.task('build', ['default', 'clean', 'minify-css', 'minify-js', 'copy-bower-components', 'copy-html-files']);