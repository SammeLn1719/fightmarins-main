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

const gulpSass = sassImport(sass);

export function cleanDev(done) {
	if (fs.existsSync('./build/')) {
		return gulp
			.src('./build/', { read: false })
			.pipe(clean({ force: true }));
	}
	done();
}

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

export function htmlDev() {
	return (
		gulp
			.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
			.pipe(changed('./build/'))
			.pipe(plumber(plumberNotify('HTML')))
			.pipe(fileInclude(fileIncludeSetting))
			.pipe(gulp.dest('./build/'))
	);
}

export function sassDev() {
	return (
		gulp
			.src('./src/scss/*.scss')
			.pipe(changed('./build/css/'))
			.pipe(plumber(plumberNotify('SCSS')))
			.pipe(sourceMaps.init())
			.pipe(sassGlob())
			.pipe(gulpSass())
			.pipe(sourceMaps.write())
			.pipe(gulp.dest('./build/css/'))
	);
}

export function imagesDev() {
	return gulp
		.src('./src/img/**/*')
		.pipe(changed('./build/img/'))
		// .pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./build/img/'));
}

export function fontsDev() {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(changed('./build/fonts/'))
		.pipe(gulp.dest('./build/fonts/'));
}

export function filesDev() {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./build/files/'))
		.pipe(gulp.dest('./build/files/'));
}

export async function jsDev() {
	const webpackConfig = (await import('../webpack.config.js')).default;
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./build/js/'))
		.pipe(plumber(plumberNotify('JS')))
		// .pipe(babel())
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./build/js/'));
}

const serverOptions = {
	livereload: true,
	open: true,
};

export function serverDev() {
	return gulp.src('./build/').pipe(server(serverOptions));
}

export function watchDev() {
	gulp.watch('./src/html/**/*.html', htmlDev);
	gulp.watch('./src/scss/**/*.scss', sassDev);
	gulp.watch('./src/img/**/*', imagesDev);
	gulp.watch('./src/fonts/**/*', fontsDev);
	gulp.watch('./src/files/**/*', filesDev);
	gulp.watch('./src/js/**/*.js', jsDev);
}

export const tasks = {
	cleanDev,
	htmlDev,
	sassDev,
	imagesDev,
	fontsDev,
	filesDev,
	jsDev,
	serverDev,
	watchDev
};
