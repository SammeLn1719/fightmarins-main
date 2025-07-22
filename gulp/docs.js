import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import sassImport from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import server from 'gulp-server-livereload';
import clean from 'gulp-clean';
import fs from 'fs';
import sourceMaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from 'webpack-stream';
import babel from 'gulp-babel';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';
import * as sass from 'sass';

import htmlclean from 'gulp-htmlclean';
import webpHTML from 'gulp-webp-html';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import webpCss from 'gulp-webp-css';
import groupMedia from 'gulp-group-css-media-queries';
import webp from 'gulp-webp';

const gulpSass = sassImport(sass);

// HTML

// SASS

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

const fileIncludeSetting = {
  prefix: '@@',
  basepath: '@file',
};

export function cleanDocs(done) {
  if (fs.existsSync('./docs/')) {
    return gulp
      .src('./docs/', { read: false })
      .pipe(clean({ force: true }));
  }
  done();
}

export function htmlDocs() {
  return gulp
    .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(changed('./docs/'))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(webpHTML())
    .pipe(htmlclean())
    .pipe(gulp.dest('./docs/'));
}

export function sassDocs() {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(changed('./docs/css/'))
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(sassGlob())
    .pipe(webpCss())
    .pipe(groupMedia())
    .pipe(gulpSass())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./docs/css/'));
}

export function imagesDocs() {
  return gulp
    .src('./src/img/**/*')
    .pipe(changed('./docs/img/'))
    .pipe(webp())
    .pipe(gulp.dest('./docs/img/'))
    .pipe(gulp.src('./src/img/**/*'))
    .pipe(changed('./docs/img/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./docs/img/'));
}

export function fontsDocs() {
  return gulp
    .src('./src/fonts/**/*')
    .pipe(changed('./docs/fonts/'))
    .pipe(gulp.dest('./docs/fonts/'));
}

export function filesDocs() {
  return gulp
    .src('./src/files/**/*')
    .pipe(changed('./docs/files/'))
    .pipe(gulp.dest('./docs/files/'));
}

export async function jsDocs() {
  const webpackConfig = (await import('../webpack.config.js')).default;
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./docs/js/'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./docs/js/'));
}

const serverOptions = {
	livereload: true,
	open: true,
};

export function serverDocs() {
  return gulp.src('./docs/').pipe(server(serverOptions));
}

export const tasks = {
  cleanDocs,
  htmlDocs,
  sassDocs,
  imagesDocs,
  fontsDocs,
  filesDocs,
  jsDocs,
  serverDocs
};
