
const {src, dest, watch, parallel} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();

function scripts() {
	return src([
		'node_modules/swiper/swiper-bundle.js',
		'app/js/main.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(concat('style.min.css'))
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function watching() {
	watch(['app/scss/style.scss'], styles)
	watch(['app/js/main.js'], scripts)
	watch(['app/*.html']).on('change', browserSync.reload);
}

function browsersync() {
	browserSync.init({
		server: {
				baseDir: "app/"
		}
});
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(styles, scripts, browsersync, watching);