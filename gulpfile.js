var gulp = require("gulp");
var browserSync = require("browser-sync");
var sass = require("gulp-sass");

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task("js", function() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", " src/scss/*.scss"],
    ["sass"]
  );
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["js", "serve"]);

/*
default task - When we type gulp in the command line, this is telling it to run both the js and serve tasks.
js task      - This is simply specifying 3 different javascript files that are stored in the node_modules folder, 
               which is created when we ran npm install ..., and moving them into our /src/js folder. 
               This way, we're able to include them in our HTML file above by referencing /src/js instead of 
               the node_modules folder.
serve task   - The serve task launches a simple server and watches our sass files, and if any are changed, 
               it calls the sass task. It also calls browser-sync when any * .html file is saved.
sass task    - This takes both of the bootstrap sass files and our custom sass files and compiles them into 
               regular CSS, and stores those CSS files into our /src/css folder.

cfr. https://coursetro.com/posts/code/130/Learn-Bootstrap-4-Final-in-2018-with-our-Free-Crash-Course

*/
