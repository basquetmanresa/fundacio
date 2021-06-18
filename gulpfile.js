
//Require gulp
const gulp = require('gulp');
const pjson = require('./package.json')


//Requires all package.json modules as plug.* + fix (pattern:'*') for browser sync
const plug = require('gulp-load-plugins')({ pattern: '*' });

//Optimize?
const optimize = {
  img: true,
  css: false,
  js: true
}
const onDjango = false
const pugSmart = false

//Folder and File Vars
this.app = `./${pjson.name}/`
const rootPaths = {
  src: this.app,
  dst: 'docs/',
  templates: 'templates/',
  static: 'static/'
}

const parentPaths = {
  templates: {
    src: rootPaths.src + rootPaths.templates,
    //dst: rootPaths.dst + rootPaths.templates,
    dst: rootPaths.dst,
    
  },

  static: {
    src: rootPaths.src + rootPaths.static,
    dst: rootPaths.dst + rootPaths.static,
  }
}

const paths = {
  templates: {
    dst: parentPaths.templates.dst,
    src: parentPaths.templates.src,
    pug: {
      src: parentPaths.templates.src + '**/*.pug',
      srcinc: parentPaths.templates.src + '_**/*',
      srcco: [parentPaths.templates.src + '**/*.pug', "!" + parentPaths.templates.src + '_**/*'],
    },
    txt: {
      src: parentPaths.templates.src + '**/*.txt'
    },
  },
  static: {
    css: {
      src: parentPaths.static.src + 'css/**/*.css',
      dst: parentPaths.static.dst + 'css/',
    },

    sass: {
      dir: parentPaths.static.src + 'sass/',
      src: parentPaths.static.src + 'sass/**/*.{sass,scss}',
    },
    img: {
      src: parentPaths.static.src + 'images/**/*.{jpg,png,webp,svg}',
      dst: parentPaths.static.dst + 'images/',
    },
    js: {
      app: {
        src: parentPaths.static.src + 'js/app/**/*.js',
        dst: parentPaths.static.dst + 'js/',
      },
      others: {
        src: [parentPaths.static.src + 'js/**/*.js', '!' + parentPaths.static.src + 'js/app/**/*.js'],
        dst: parentPaths.static.dst + 'js/',
      }
    },
    fonts: {
      src: parentPaths.static.src + 'fonts/**/*',
      dst: parentPaths.static.dst + 'fonts/',
    },
    video: {
      src: parentPaths.static.src + 'video/**/*',
      dst: parentPaths.static.dst + 'video/',
    },
  },
}

function sass() {
  return gulp.src(paths.static.sass.src, { since: gulp.lastRun(sass) })
    .pipe(plug.sassInheritance({ dir: paths.static.sass.dir }))
    .pipe(plug.filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(plug.dartSass())
    
    .pipe(gulp.dest(paths.static.css.dst))
    .pipe(plug.if(!optimize.css,
      plug.browserSync.stream()
    ))

};
function allPug() {
  //- compila tots els pugs sense _ a carpeta o fitxer
  return gulp.src(paths.templates.pug.src)
    .pipe(plug.filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(plug.pug({ basedir: paths.templates.src }))
    .pipe(gulp.dest(paths.templates.dst))
    .pipe(plug.browserSync.stream())

};
function sincePug() {
  //- allPug + només pasen els fitxers canviats (lastRun).
  return gulp.src(paths.templates.pug.src, { since: gulp.lastRun(sincePug) })
    .pipe(plug.filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(plug.pug({ basedir: paths.templates.src }))
    .pipe(gulp.dest(paths.templates.dst))
    .pipe(plug.browserSync.stream())
};

function smartPug() {
  //- sincePug + inheritance(compila pugs afectats pel fitxer canviat [PE en cas de mixin/include])
  return gulp.src(paths.templates.pug.src, { since: gulp.lastRun(smartPug) })
    .pipe(plug.pugInheritance({ basedir: paths.templates.src, skip: 'strange-fix' }))
    .pipe(plug.filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(plug.pug({ basedir: paths.templates.src }))
    .pipe(gulp.dest(paths.templates.dst))
    .pipe(plug.browserSync.stream())
};

function txt() {
  return gulp.src(paths.templates.txt.src, { since: gulp.lastRun(txt) })
    .pipe(gulp.dest(paths.templates.dst))
    .pipe(plug.browserSync.stream())
};

function img() {
  return gulp.src(paths.static.img.src, { since: gulp.lastRun(img) })
    .pipe(plug.if(optimize.img,
      plug.imagemin({ interlaced: true, progressive: true, optimizationLevel: 5, svgoPlugins: [{ removeViewBox: true }] })
    ))
    .pipe(gulp.dest(paths.static.img.dst))
    .pipe(plug.browserSync.stream())
};

function css() {
  return gulp.src(paths.static.css.src, { since: gulp.lastRun(css) })
    .pipe(plug.purgecss({ content: [paths.templates.dst + '**/*.html'] }))
    .pipe(plug.csso())
    .pipe(gulp.dest(paths.static.css.dst))
    .pipe(plug.browserSync.stream())

};

function appJs() {
  return gulp.src(paths.static.js.app.src)
    .pipe(plug.concat('app.js'))
    .pipe(plug.if(optimize.js,
      plug.terser()
    ))
    .pipe(gulp.dest(paths.static.js.app.dst))
    .pipe(plug.browserSync.stream())
};

function otherJs() {
  return gulp.src(paths.static.js.others.src, { since: gulp.lastRun(otherJs) })
    .pipe(plug.if(optimize.js,
      plug.terser()
    ))
    .pipe(gulp.dest(paths.static.js.others.dst))
    .pipe(plug.browserSync.stream())
};

function fonts() {
  return gulp.src(paths.static.fonts.src, { since: gulp.lastRun(fonts) })
    .pipe(gulp.dest(paths.static.fonts.dst))
    .pipe(plug.browserSync.stream())
};

function video() {
  return gulp.src(paths.static.video.src, { since: gulp.lastRun(video) })
    .pipe(gulp.dest(paths.static.video.dst))
    .pipe(plug.browserSync.stream())
};

function browserSync() {
  if (onDjango) {
    plug.browserSync.init(
      {
        // https://www.browsersync.io/docs/options/#option-proxy
        proxy: {
          target: 'django:8000',
          proxyReq: [
            function (proxyReq, req) {
              // Assign proxy "host" header same as current request at Browsersync server
              proxyReq.setHeader('Host', req.headers.host)
            }
          ]
        },
        // https://www.browsersync.io/docs/options/#option-open
        // Disable as it doesn't work from inside a container
        open: false
      }
    )
  } else {
    plug.browserSync.init(
      {
        // https://browsersync.io/docs/options#option-server
        server: {
          baseDir: rootPaths.dst,
          directory: true
        },
        // https://www.browsersync.io/docs/options/#option-open
        // Disable as it doesn't work from inside a container
        open: false
      }
    )
  }
}

function watch() {
  if (pugSmart) {
    gulp.watch(paths.templates.pug.src, smartPug);
  } else {
    gulp.watch(paths.templates.pug.srcco, sincePug);
    gulp.watch(paths.templates.pug.srcinc, allPug);
  }
  gulp.watch(paths.templates.txt.src, txt);
  gulp.watch(paths.static.sass.src, sass);
  if (optimize.css) {
    gulp.watch(paths.static.css.src, css);
  }
  gulp.watch(paths.static.img.src, img);
  gulp.watch(paths.static.js.app.src, appJs);
  gulp.watch(paths.static.js.others.src, otherJs);
  gulp.watch(paths.static.fonts.src, fonts);
  gulp.watch(paths.static.video.src, video);
};

exports.default = gulp.parallel(watch, browserSync);


exports.rebuild = gulp.parallel(allPug, txt, gulp.series(sass, css), appJs, otherJs, img, fonts, video);