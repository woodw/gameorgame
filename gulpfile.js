'use strict';

var gulp = require('gulp');

var eslint = require('gulp-eslint');
var Server = require('karma').Server;

var clean = require('gulp-clean');

var htmlreplace = require('gulp-html-replace');

var templates = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');

var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var bytediff = require('gulp-bytediff');
var babel = require('gulp-babel');

var pkg = {
    paths: {
        config: {
            karma: __dirname + '/karma.conf.js'
        },
        src: {
            js: 'src/**/*.js',
            css: 'src/**/*.css',
            templates: 'src/client/**/*.template.html'
        },
        dist: {
            js: './dist/main.min.js',
            css: './dist/style.min.css',
            templates: './dist/template.js'            
        }
    }
};

//Check to make sure coding is up to standards
gulp.task('lint', function (){
    return gulp.src(['src/**/*.js', '!**/bower_components/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

//Angular UNIT Test
gulp.task('tdd', ['lint'], function (done) {
  new Server({
    configFile: pkg.paths.config.karma,
    singleRun: true
  }, done).start();
});

//Clean the dist folder before build
gulp.task('clean', function (){
    gulp.src(['dist/*', 'dist/**/*'])
        .pipe(clean({force:true}));
});

//Convert Anuglar html templates to cache
gulp.task('templates', ['clean'], function () {
    gulp.src([pkg.paths.src.templates])
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(templates('templates.js'))
        .pipe(gulp.dest('./dist/'));
});

//Application JS files, 
gulp.task('js', ['clean', 'tdd', 'templates'], function () {
    return gulp.src(['src/client/**/*.js', '!**/*(.test|.spec).js', '!**/bower_components/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.min.js', {newLine: ';'}))
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(bytediff.start())
        .pipe(uglify({mangle: true}))
        .pipe(bytediff.stop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

//move the bower files to dist
gulp.task('copy-bower-components', ['clean'], function (){
    gulp.src('src/client/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

//move the index to dist and point to minify css & js
gulp.task('copy-index', ['clean'], function (){
    gulp.src('src/client/index.html')
        .pipe(htmlreplace({
            'css': 'style.min.css',
            'js': 'app.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'tdd']);

gulp.task('build', ['default', 'js', 'templates', 'copy-bower-components', 'copy-index']);


