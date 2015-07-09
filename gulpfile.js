/**
 * Created by synerzip on 08/07/15.
 */
// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var deploy = require('gulp-gh-pages');

// tasks
gulp.task('lint', function() {
    gulp.src(['./app/**/*.js','./src/**/*.js', '!./bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
    gulp.src('./dist/*')
        .pipe(clean({force: true}));
});

gulp.task('minify-css', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['./app/**/*.css', '!./bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('minify-js', function() {
    gulp.src(['./app/**/*.js', '!./bower_components/**'])
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('build-calendar', function() {
    return gulp.src([
        'src/directives/calendar.js'])
        .pipe(concat('angular-calendar.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('docs/lib'))
        .pipe(stripDebug())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename('angular-calendar.min.js'))
        .pipe(gulp.dest('dist'))
        .on('error', gutil.log);
});




gulp.task('copy-bower-components', function () {
    gulp.src('./bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-material-font', function () {
    gulp.src('./bower_components/materialize/font/**')
        .pipe(gulp.dest('dist/bower_components/materialize/font'));
});

gulp.task('copy-html-files', function () {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-calendar-templates', function () {
    gulp.src('./src/directives/templates/*.html')
        .pipe(gulp.dest('dist/templates/'));
});


gulp.task('connect', function () {
    connect.server({
        root: 'app/',
        port: 8888
    });
});
gulp.task('connectDist', function () {
    connect.server({
        root: 'dist/',
        port: 9999
    });
});


// default task
gulp.task('default',
    ['lint', 'connect']
);
// build task
gulp.task('build',
    ['lint', 'minify-css', 'minify-js', 'build-calendar','copy-html-files', 'copy-bower-components', 'copy-calendar-templates','connectDist']
);
