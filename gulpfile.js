const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const child = require('child_process');
const gutil = require('gulp-util');
const fs = require('fs');
const browserSync = require('browser-sync').create();
const siteRoot = '_site';
const cssFiles = '_css/**/*.?(s)*ss';
var download = require('gulp-downloader'),
    jeditor = require('gulp-json-editor'),
    jsonTransform = require('gulp-json-transform'),
    request = require('request'),
    source = require('vinyl-source-stream'),
    ghPages = require('gulp-gh-pages'),
    streamify = require('gulp-streamify'),
    minify = require('gulp-minify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename');

gulp.task('blog', function () {
    return request({
        url: 'https://api.airtable.com/v0/appSTMfI6fck1RzVM/Posts?&view=ordered',
        headers: {
            'User-Agent': 'request',
            'Authorization': 'Bearer keyRTLlrVS02vC3Vx'
        }
    })
        .pipe(source('blog.json'))
        .pipe(streamify(jsonTransform(function (data) {
            // data is your json

            // start off with an empty array
            var arr = [];
            // loop through every record
            for (var i = 0, ii = data.records.length; i < ii; i++) {
                // push the item value into the array
                arr.push(data.records[i].fields);
            }
            return arr;
        })))
        .pipe(gulp.dest('./_data'));
});

gulp.task('download', function () {
    return download({
        fileName: 'radio_devos.json',
        request: {
            url: 'https://api.airtable.com/v0/appWalqcA1KjDB5Ix/Devotions?api_key=keyRTLlrVS02vC3Vx'
        }
    })
        .pipe(gulp.dest('./_data'))
        ;
});


gulp.task('css', function () {
    gulp.src(cssFiles)
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('minify-js', function () {
    gulp.src('js/custom.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '.min.js']
        }))
        .pipe(gulp.dest('js'))
});

gulp.task('minify-css', function () {
    return gulp.src('css/main.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('css/'));
});

gulp.task('serve', function () {
    browserSync.init({
        files: [siteRoot + '/**'],
        port: 3000,
        server: {
            baseDir: siteRoot
        }
    });
    gulp.watch(cssFiles, ['css']);
});

gulp.task('jekyll', function () {
    const jekyll = child.spawn('jekyll', ['build',
        '--watch',
        '--incremental',
        '--drafts'
    ]);

    const jekyllLogger = (buffer) => {
        buffer.toString()
            .split(/\n/)
            .forEach((message) => gutil.log('Jekyll: ' + message));
    };
    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('deploy', ['blog', 'css', 'minify-css', 'minify-js', 'jekyll']);
gulp.task('tweak', ['css', 'minify-css', 'minify-js', 'serve']);
gulp.task('default', ['blog', 'css', 'minify-css', 'minify-js', 'jekyll', 'serve']);