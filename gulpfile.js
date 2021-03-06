var gulp = require('gulp');
const babel = require('gulp-babel');
var flatten = require('gulp-flatten');
var clean = require('gulp-clean');
var sequence = require('gulp-sequence');
var sass = require('gulp-sass');
var panini = require('panini');
watch = require('gulp-watch');

gulp.task('clean', function (done) {
    return gulp.src('app/build/')
        .pipe(clean());
    done();
});

gulp.task('cleanImg', function (done) {
    return gulp.src('app/build/img')
        .pipe(clean());
    done();
});

gulp.task('cleanVid', function (done) {
    return gulp.src('app/build/video')
        .pipe(clean());
    done();
});

function html(done) {
    return gulp.src('app/src/pages/**/*.html')
        .pipe(panini({
            root: 'app/src/pages/',
            layouts: 'app/src/layouts/'
        }))
        .pipe(gulp.dest('app/build'));
    done();
};

function img(done) {
    return gulp.src('app/src/assets/img/**/*')
        .pipe(flatten())
        .pipe(gulp.dest('app/build/img'));
    done();
};

function video(done) {
    return gulp.src('app/src/assets/video/**/*')
        .pipe(flatten())
        .pipe(gulp.dest('app/build/video'));
    done();
};

function js(done) {
    return gulp.src('app/src/assets/js/**/*.js')
    // .pipe(flatten())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('app/build/js'));
    done();
};


function scss(done) {
    return gulp.src('app/src/assets/scss/**/*.{scss,css}')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/build/css'));
    done();
};

gulp.task('watch', function () {
    gulp.watch('app/src/{layouts,partials,helpers,data}/**/*', gulp.series(panini.refresh));
    gulp.watch('app/src/**/*.html', {cwd: './'}, gulp.series(html));
    gulp.watch('app/src/assets/**/*.scss', {cwd: './'}, gulp.series(scss));
    gulp.watch('app/src/assets/**/*.js', {cwd: './'}, gulp.series(js));
    gulp.watch('app/src/assets/img/**/*', {cwd: './'}, gulp.series('cleanImg', img));
    gulp.watch('app/src/assets/video/**/*', {cwd: './'}, gulp.series('cleanVid', video));
});

gulp.task('build', gulp.parallel(html, js, scss));
gulp.task('default', gulp.series('clean', 'build', 'watch'));
