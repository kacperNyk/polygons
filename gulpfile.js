const { series, src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

function compilecss() {
  return src("src/scss/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

function minifyjs() {
  return src("src/js/**/*.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function serverReload(cb) {
  browsersync.reload();
  cb();
}

function minphotos() {
  return src("src/assets/*.{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist", { sourcemaps: "." }));
}

function webpImg() {
  return src("src/assets/*.{jpg,png}", { sourcemaps: true })
    .pipe(webp())
    .pipe(dest("dist", { sourcemaps: "." }));
}

function watchTask() {
  watch("*.html", serverReload);
  watch(
    ["src/scss/**/*.scss", "src/js/**/*.js"],
    series(compilecss, minifyjs, serverReload)
  );
}

exports.default = series(
  compilecss,
  minifyjs,
  browsersyncServe,
  watchTask,
  minphotos,
  webpImg
);
