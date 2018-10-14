const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('default', () => {
  gulp.src([
    'js/**/*',
    'css/**/*',
    '_locales/**/*',
    'res/**/*',
    'manifest.json',
    '*.html',
  ], {base: '.'})
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./'));
});
