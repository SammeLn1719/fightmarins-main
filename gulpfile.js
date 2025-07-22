import gulp from 'gulp';
import { tasks as devTasks, cleanDev, htmlDev, sassDev, imagesDev, fontsDev, filesDev, jsDev, serverDev, watchDev } from './gulp/dev.js';
import { tasks as docsTasks, cleanDocs, htmlDocs, sassDocs, imagesDocs, fontsDocs, filesDocs, jsDocs, serverDocs } from './gulp/docs.js';

gulp.task('clean:dev', cleanDev);
gulp.task('html:dev', htmlDev);
gulp.task('sass:dev', sassDev);
gulp.task('images:dev', imagesDev);
gulp.task('fonts:dev', fontsDev);
gulp.task('files:dev', filesDev);
gulp.task('js:dev', jsDev);
gulp.task('server:dev', serverDev);
gulp.task('watch:dev', watchDev);

gulp.task('clean:docs', cleanDocs);
gulp.task('html:docs', htmlDocs);
gulp.task('sass:docs', sassDocs);
gulp.task('images:docs', imagesDocs);
gulp.task('fonts:docs', fontsDocs);
gulp.task('files:docs', filesDocs);
gulp.task('js:docs', jsDocs);
gulp.task('server:docs', serverDocs);

export const defaultTask = gulp.series(
  'clean:dev',
  gulp.parallel('html:dev', 'sass:dev', 'images:dev', 'fonts:dev', 'files:dev', 'js:dev'),
  gulp.parallel('server:dev', 'watch:dev')
);
gulp.task('default', defaultTask);

export const docs = gulp.series(
  'clean:docs',
  gulp.parallel('html:docs', 'sass:docs', 'images:docs', 'fonts:docs', 'files:docs', 'js:docs'),
  gulp.parallel('server:docs')
);
gulp.task('docs', docs);
