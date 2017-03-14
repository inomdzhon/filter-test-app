'use strict';

/* global gulp */

gulp.task('build:dev', ['scripts', 'svg', 'templates', 'styles', 'images', 'copy']);
gulp.task('build:prod', ['scripts', 'svg', 'styles', 'images', 'copy']);
