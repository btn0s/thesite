var gulp = require('gulp');
var flatten = require('gulp-flatten');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');

gulp.task('clean', function () {
  return gulp.src('./app/build/**/*')
  .pipe(clean());
});

gulp.task('html', function () {
  gulp.src('./app/src/**/*.html')
  .pipe(flatten())
  .pipe(gulp.dest('./app/build/'));
});

gulp.task('js', function(){
  gulp.src('./app/src/assets/js/app.js')
  // .pipe(flatten())
  .pipe(gulp.dest('./app/build/js'));
});

gulp.task('scss', function(){
  gulp.src('./app/src/assets/scss/app.scss')
  // .pipe(flatten())
  .pipe(gulp.dest('./app/build/css'));
});

gulp.task('build', ['html','js','scss']);
gulp.task('default', sequence('clean','build'));
