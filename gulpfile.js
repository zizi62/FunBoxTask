const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const preproc = require('gulp-sass');
const babel = require('gulp-babel');

const config = {
    src: './src',
    css: {
        watch: '/precss/**/*.scss',
        src: '/precss/styles.scss',
        dest: '/css'
    },
    html: {
        src: '/index.html'
    },

    js: {
        src: '/js/**/*.js',
        dest: '/jstask'
    }
};

gulp.task('build', function () {
    gulp.src(config.src + config.css.src)
            .pipe(sourcemaps.init())
            .pipe(preproc())
            .pipe(gcmq())
            .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
            }))
            .pipe(cleanCSS({
                level: 2
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.src + config.css.dest))

            .pipe(browserSync.reload({
                stream: true
            }));
});

gulp.task('build-js', function () {
    return gulp.src(config.src + config.js.src)
      .pipe(babel({
        presets: ['@babel/env']
    }))
      .pipe(gulp.dest(config.src + config.js.dest));
  });

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(config.src + config.css.watch, ['build','build-js' ]);
    gulp.watch(config.src + config.html.src, browserSync.reload);
    gulp.watch(config.src + config.js.src, browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    });
});


// // var babel = require("gulp-babel");

// gulp.task("default", function () {
//   return gulp.src("src/app.js")
//     .pipe(minify())
//     .pipe(gulp.dest("dist"));
// });