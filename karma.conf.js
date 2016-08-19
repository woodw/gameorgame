//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: 'src/client',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            '**/*.module.js',
            '*!(.module|.spec).js',
            '!(bower_components)/**/*!(.module|.spec).js',
            '**/*.spec.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ]

    });
};