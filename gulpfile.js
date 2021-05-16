const { src, dest } = require('gulp');
const { watch, series } = require('gulp');

const htmlmin = require('gulp-htmlmin');
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');

sass2css = function() {
    return src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./public/css"));
}

minifyHtml = function() {
    return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./public'));
}

gulpBabelMinify = function() { 
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(minify({
        mangle: {
            keepClassName: true
        }
    }))
    .pipe(gulp.dest('./public/js'))
};

exports.default = function() {

    watch('./src/scss/**/*.scss', sass2css);
    watch('./src/**/*.html', minifyHtml);
    watch('./src/js/**/*.js', gulpBabelMinify);
    
}