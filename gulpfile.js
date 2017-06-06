var gulp = require("gulp"),
    sass = require("gulp-sass"),
    smartgrid = require('smart-grid'),
    browserSync = require("browser-sync");

// Сервер
gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
        baseDir: 'app/'
    }
    });   
});

// Sass компиляция
gulp.task('sass',function(){
    return gulp.src(['app/sass/**/*.sass','app/sass/**/*.scss'])
    .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
    .pipe(gulp.dest('app/css'))
});


// smartgrid - запуск
gulp.task('smartgrid', function() {
    var settings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '20px', /* gutter width px || % */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '30px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
            fields: '30px' /* side fields */
        },
        md: {
            width: '960px',
            fields: '15px'
        },
        sm: {
            width: '780px',
            fields: '15px'
        },
        xs: {
            width: '560px',
            fields: '15px'
        }
    }
};
    smartgrid('app/static/sass', settings);
});

// Слежка
gulp.task('watch', function () {
    gulp.watch([
        'app/*.html',
        'app/sass/**/*.scss',
        'app/css/*.css',
        'app/js/**/*.js'
    ],['sass']).on('change', browserSync.reload);
});


// Запуск по умолчанию
gulp.task('default', ['server', 'sass', 'watch']);