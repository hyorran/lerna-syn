/* eslint-ignore */

const gulp = require('gulp')
const gulpsync = require('gulp-sync')(gulp)
const gulpLoadPlugins = require('gulp-load-plugins')
const $ = gulpLoadPlugins()
const fs = require('fs')
const uuid = require('uuid/v1')
const tail = require('lodash/tail')

// const synsuitePath = '../../../../synsuite'
const synsuitePath = '../../../../syndocker/projects/synsuite'
const reactDest = `${ synsuitePath }/app/webroot/react/`
const synsuiteIndexHtml = `${ synsuitePath }/app/View/Layouts/default.ctp`

const writeFile = (file, fileContent) => new
Promise((resolve, reject) => fs.writeFile(
  file,
  fileContent,
  err => err ? reject(err) : resolve()
))

const readFile = filename => fs.readFileSync(filename, 'utf8')

gulp.task('move-build-to-synsuite-webroot', () => {
  return gulp.src(['./build/**/*', '!./build/index.html'])
    .pipe(gulp.dest(reactDest))
})

gulp.task('move-pubsub-to-synsuite-webroot', () => {
  return gulp.src('../../../node_modules/pubsub-js/src/pubsub.js')
    .pipe($.plumber())
    .pipe($.babel({
      presets: [
        "minify"
      ]
    }))
    .pipe(gulp.dest(reactDest))
})

gulp.task('reset-synsuite-cache', () => new Promise((resolve, reject) => {
  try {
    let fileContent = readFile(synsuiteIndexHtml)
    const hash = uuid()

    const createHash = (filename) => {
      fileContent = fileContent.split(filename)
      if (fileContent.length > 1) {
        fileContent[1] = `"${ tail(fileContent[1].split('"')).join('"') }`
      }
      fileContent = fileContent.join(`${ filename }?${ hash }`)
    }

    createHash('./react/vendors~main.js')
    createHash('./react/main.js')

    resolve(writeFile(synsuiteIndexHtml, fileContent))
  }
  catch (e) {
    console.error(e)
    reject(e)
  }
}))

gulp.task('publish', gulpsync.sync([
  [
    'move-build-to-synsuite-webroot',
    'move-pubsub-to-synsuite-webroot'
  ],
  'reset-synsuite-cache'
]))

