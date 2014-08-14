gulp = require "gulp"
zip = require "gulp-zip"
sass = require "gulp-sass"
concat = require "gulp-concat"
uglify = require "gulp-uglify"
rename = require "gulp-rename"
pkg = require "./package"

paths =
  src: "./src"
  dest: "./dest/metier"
  styles: "./src/scss"
  scripts: "./src/scripts"
  layout: "./src/layout"

gulp.task "scripts", ->
  gulp.src [
    "bower_components/jquery/dist/jquery.js"
    "#{ paths.scripts }/**/*.js"
  ]
    .pipe concat "metier.js"
    .pipe gulp.dest "#{ paths.dest }/source/js"
    .pipe uglify()
    .pipe rename { extname: '.min.js' }
    .pipe gulp.dest "#{ paths.dest }/source/js"

gulp.task "styles", ->
  gulp.src "#{ paths.styles }/metier.scss"
    .pipe sass
      outputStyle: "compressed"
      includePaths: [
        "bower_components/modularized-normalize-scss"
        "bower_components/bourbon/dist"
      ]
    .pipe gulp.dest "#{ paths.dest }/source/css"

gulp.task "layout", ->
  gulp.src "#{ paths.src }/_config.yml"
    .pipe gulp.dest paths.dest
  gulp.src "#{ paths.layout }/**/*.jade"
    .pipe gulp.dest "#{ paths.dest }/layout"

gulp.task "archive", ["styles", "scripts", "layout"], ->
  gulp.src "dest/**/*"
    .pipe zip "metier-#{ pkg.version }.zip"
    .pipe gulp.dest "releases"

gulp.task "watch", ->
  gulp.watch "#{ paths.scripts }/**/*.js", ["scripts"]
  gulp.watch "#{ paths.styles }/**/*.scss", ["styles"]
  gulp.watch "#{ paths.layout }/**/*.jade", ["layout"]
  gulp.watch "#{ paths.src }/_config.yml", ["layout"]

gulp.task "default", ["archive"]
