'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import browserSync from 'browser-sync';

gulp.task('govuk-images', function () {

  return gulp.src(config.govuk_images.src)
    .pipe(changed(config.govuk_images.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.govuk_images.dest))
    .pipe(browserSync.stream());

});
