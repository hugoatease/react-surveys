var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');

gulp.task('default', ['build']);
gulp.task('build', ['lib', 'bundle']);

gulp.task('lib', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib/'));
});

gulp.task('bundle', function() {
  return browserify({
    entries: ['./surveys.js'],
    transform: [reactify],
    standalone: 'surveys'
  })
  .bundle()
  .pipe(source('surveys.js'))
  .pipe(gulp.dest('dist/'));
});
