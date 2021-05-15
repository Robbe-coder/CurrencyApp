const { src, dest } = require('gulp');
const { watch, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');

const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

sass2css = function(){
    return src('./public/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./public/css"));
}

  
minify = function(){
    return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./public'));
}
exports.default = function(){

    watch('./public/scss/**/*.scss', sass2css);
    watch("./src/**/*.html", minify);
    
}