var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('default', ['build']);
gulp.task('build', ['app']);

gulp.task('app', function() {
  return browserify({
    entries: ['./src/index.js'],
    transform: [reactify],
    standalone: 'surveys'
  })
  .bundle()
  .pipe(source('surveys.js'))
  .pipe(gulp.dest('./dist'));
});
