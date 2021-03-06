import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith-multi';
import checkIconsInDir from 'spritesmith-dir-checker';
import merge from 'merge-stream';
import path from 'path';
import errorHandler from 'gulp-plumber-error-handler';

/* global __dirname */
const cwd = path.join(__dirname, `..`);
const spritesDirPath = `app/sprites`;
const imgPath = `../images/sprites/`;

gulp.task(`sprites`, () => {
  const canDoNext = checkIconsInDir(cwd, spritesDirPath);

  if (!canDoNext) {
    return;
  }

  const spriteData = gulp.src([`app/sprites/**/*.png`, `!app/sprites/*.png`])
    .pipe(plumber({ errorHandler: errorHandler(`Error in \`sprites\` task`) }))
    .pipe(spritesmith({
      spritesmith(options) {
        options.imgPath = imgPath + options.imgName;
        options.retinaImgPath = imgPath + options.retinaImgName;
        options.cssName = options.cssName.replace(/\.css$/, `.scss`);
        options.cssFormat = `scss`;
        options.cssTemplate = `scss_retina.template.handlebars`;
        options.algorithm = `binary-tree`;
        options.padding = 8;

        return options;
      }
    }));

  const imgStream = spriteData.img.pipe(gulp.dest(`dist/assets/images/sprites`));
  const styleStream = spriteData.css.pipe(gulp.dest(`app/styles/sprites`));
  /* eslint consistent-return: "off" */
  return merge(imgStream, styleStream);
});
