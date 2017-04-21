var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		cleanCSS = require('gulp-clean-css'),
		nodemon = require('gulp-nodemon'),
		gulpif = require('gulp-if');

var enviornment = 'development';

// JS
gulp.task('js', function() {
	return gulp.src('./app/js/*.js')
		.pipe(gulpif(enviornment === 'production', uglify()))
		.on('error', function(err) {
			console.error('Error: ', err.messsage);
		})
		.pipe(gulp.dest('./dist/js'));
});

// HTML
gulp.task('html', function() {
});

// CSS
gulp.task('css', function() {
	return gulp.src('./app/css/*.css')
		.pipe(gulpif(enviornment === 'production', cleanCSS()))
		.pipe(gulp.dest('./dist/css'))
});

// BUILD
gulp.task('build', ['js','css']);

// SERVE
gulp.task('serve', function() {
	nodemon({
		script: 'app.js',
		ext: 'js',
		ignore: 'dist/',
		tasks: ['js']
	})
	.on('restart', function() {
		console.log('Restarting the server...');
	})
});

// DEFAULT
gulp.task('default', ['serve']);

