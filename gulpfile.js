var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css');
var cssWrap = require('gulp-css-wrap');

var customThemeName='.custom-theme'
var file = './theme/app.css';

gulp.task('css-wrap', function() {
  return gulp.src( path.resolve(file))
    .pipe(cssWrap({selector:customThemeName}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('theme/dist'));
});

gulp.task('move-font', function() {
  return gulp.src(['./theme/fonts/**']).pipe(gulp.dest('dist/fonts'));
});

gulp.task('default',gulp.series('css-wrap'));
