var path = require('path');
var fs = require('fs');

var appRoot = 'src/';
var distDir = 'dist/';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

module.exports = {
    coverageDir: 'build/reports/coverage',
    jsSrc: appRoot + '**/*.js',
    jsSrcDir: appRoot,
    jsSpec: 'test/**/*.spec.js',
    jsSpecEntry: 'test/index.js',
    sassSrc: appRoot + '**/*.scss',
    packageName: pkg.name,
    doc: 'doc/',
    output: distDir,

    // Path to the js entry point (source)
    jsEntry: appRoot + 'dual-listbox.js'
};
