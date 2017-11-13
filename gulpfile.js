var gulp = require('gulp');
var flatten = require('gulp-flatten');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var sass = require('gulp-sass');
var panini = require('panini');

gulp.task('clean', function (done) {
  return gulp.src('./app/build/')
  .pipe(clean());
  done();
});

gulp.task('html', function (done) {
  gulp.src('./app/src/pages/**/*.html')
    .pipe(panini({
      root: './app/src/pages/',
      layouts: './app/src/layouts/'
    }))
    .pipe(gulp.dest('./app/build'));
  done();
});

gulp.task('js', function(done){
  gulp.src('./app/src/assets/js/app.js')
  // .pipe(flatten())
  .pipe(gulp.dest('./app/build/js'));
  done();
});

gulp.task('scss', function(done){
  gulp.src('./app/src/assets/scss/app.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./app/build/css'));
  done();
});

gulp.task('watch', function(){
  gulp.watch('./app/src/{layouts,partials,helpers,data}/**/*').on('all', gulp.series(panini.refresh));
  gulp.watch('./app/src/**/*.html').on('all', gulp.series('html'));
  gulp.watch('./app/src/**/*.scss').on('all', gulp.series('scss'));
  gulp.watch('./app/src/**/*.js').on('all', gulp.series('js'));
});

gulp.task('build', gulp.parallel('html','js','scss'));
gulp.task('default', gulp.series('clean','build','watch'));
