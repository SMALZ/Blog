var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task("sass",function(){
  return gulp.src("public/sass/douban/*.scss")
          .pipe(sass().on("error", sass.logError))
          .pipe(gulp.dest("public/css/douban"));
});

gulp.task("watch",function(){
  gulp.watch("public/sass/douban/*.scss",["sass"]);
});
