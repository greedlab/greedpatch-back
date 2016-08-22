// npm install

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const del = require('del');
const plumber = require('gulp-plumber');

const dist_dir = 'dist';

const src_js_files = ['src/!(assets)/**/*.{js,es6}', 'src/*.{js,es6}'];
const dist_js_dir = dist_dir;

gulp.task('clean', () => {
    return del(dist_dir);
});

gulp.task('build', () => {
    return gulp.src(src_js_files)
        .pipe(plumber())
        .pipe(changed(dist_js_dir))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist_js_dir));
});

gulp.task('watch', () => {
    gulp.watch(src_js_files, ['build']);
});

gulp.task('rebuild', () => {
    return runSequence('clean','build');
});
