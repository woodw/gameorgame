'use strict';

//Gulp task runner
var gulp = require('gulp');

//Gulp assistants
var gutil = require('gulp-util');
var clean = require('gulp-clean');

//Test and verifying javascript w/ unit tests
var eslint = require('gulp-eslint');
var Server = require('karma').Server;

//replace blocks of development sources with production mini files
var htmlreplace = require('gulp-html-replace');

//store HTML templates within Angular templateCache
var templates = require('gulp-angular-templatecache');
//might remove this
var minifyHTML = require('gulp-minify-html');

//Bundle angular app code into one production file.
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var bytediff = require('gulp-bytediff');
var babel = require('gulp-babel');

//directory sources
var pkg = {
    paths: {
        karma_cfg: __dirname + '/karma.conf.js',
        client_src: 'src/client/',
        client_dist: 'dist/client/',
        server_script_src: 'src/server/index.js',
        karma_script_src: 'src/client/app/**/*.spec.js',
        bower_script_src: 'src/client/bower_components/**',
        bower_script_dest: 'dist/client/bower_components',
        client_template_src: 'src/client/index.html',
        client_style_dest: 'style.min.css',
        client_script_dest: [
            'templates.min.js', 
            'app.min.js'
        ],
        angular_script_src: [
            'src/client/app/*.module.js',
            'src/client/app/*.config.js',
            'src/client/app/core/*.module.js',
            'src/client/app/core/**/*.module.js',
            'src/client/app/core/**/*.service.js',
            'src/client/app/**/*.module.js',
            'src/client/app/**/*.component.js'
        ],
        angular_script_dest: 'app.min.js',
        angular_template_src: 'src/client/app/**/*.template.html',
        angular_template_dest: 'templates.min.js'
    }
}

//Check to make sure coding is up to standards
gulp.task('lint', function (){
    return gulp.src([].concat(
            pkg.paths.angular_script_src,
            pkg.paths.karma_script_src,
            pkg.paths.server_script_src
        ))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

//Angular UNIT Test
gulp.task('tdd', ['lint'], function (done) {
  return new Server({
    configFile: pkg.paths.karma_cfg,
    singleRun: true
  }, done).start();
});

//Clean the dist folder before build
gulp.task('clean', function (){
    return gulp.src(pkg.paths.client_dist)
        .pipe(clean({force:true,read: false}));
});

//Convert Anuglar html templates to cache
gulp.task('cache-templates', ['clean'], function () {
    return gulp.src(pkg.paths.angular_template_src)
        .pipe(templates(pkg.paths.angular_template_dest, {
            standalone: true,
            transformUrl: function (url){
                return url;
            }
        }))
        .pipe(gulp.dest(pkg.paths.client_dist));
});

//Application JS files, 
gulp.task('minify-js', ['clean'], function () {
    return gulp.src(pkg.paths.angular_script_src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat(pkg.paths.angular_script_dest, {newLine: ';'}))
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(bytediff.start())
        .pipe(uglify({mangle: true}))
        .pipe(bytediff.stop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(pkg.paths.client_dist));
});

//move the bower files to dist
gulp.task('copy-bower-components', ['clean'], function (){
    return gulp.src(pkg.paths.bower_script_src)
        .pipe(gulp.dest(pkg.paths.bower_script_dest));
});

//move the index to dist and point to minify css & js
gulp.task('copy-index', ['clean'], function (){
    return gulp.src(pkg.paths.client_template_src)
        .pipe(htmlreplace({
            'css': pkg.paths.client_style_dest,
            'js': pkg.paths.client_script_dest
        }))
        .pipe(gulp.dest(pkg.paths.client_dist));
});

gulp.task('test', ['tdd']);

gulp.task('build', ['copy-bower-components', 'cache-templates', 'minify-js', 'copy-index']);
