var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss')
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano');

var browserSync = require('browser-sync').create();

var paths = {
    styles: {
        src:  './assets/css/scss/**/*.scss',
        dest: './'
    }
};

////////////////////////////////
//
// TASKS
//
///////////////////////////////

function stylesTask() {
    return gulp.src(paths.styles.src)
               .pipe(sass().on('error', sass.logError))
               .pipe(postcss([autoprefixer(), cssnano()]))
               .pipe(gulp.dest(paths.styles.dest))
               .pipe(browserSync.stream());
}

function watchTask(cb){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('**/*.html', browserSync.reload);
    gulp.watch(paths.styles.src, stylesTask);
}

////////////////////////////////
//
// EXPORTS
//
///////////////////////////////

exports.styles = stylesTask;
exports.watch  = watchTask;