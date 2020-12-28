/*
 * Copyright 2020 qvint <https://github.com/qvint>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const gulp = require('gulp');
const minifyHtml = require('gulp-htmlmin');
const named = require('vinyl-named');
const conditional = require('gulp-if');
const webpackStream = require('webpack-stream');
const createStyledComponentsTransformer =
    require('typescript-plugin-styled-components').default;

const isRelease = !process.argv.slice(3).includes('--debug');
const buildDir = isRelease ? 'out/Release' : 'out/Debug';
const styledComponentsTransformer = createStyledComponentsTransformer();

// --- Build HTML ---

const htmlGlobs = ['res/*.html'];

function buildHtml() {
  return gulp.src(htmlGlobs)
      .pipe(conditional(isRelease, minifyHtml({
        collapseWhitespace: true,
        removeComments: true,
      })))
      .pipe(gulp.dest(buildDir));
}

function watchHtml() {
  return gulp.watch(htmlGlobs, { ignoreInitial: false }, buildHtml);
}

// --- Build scripts ---

function buildScripts() {
  return executeWebpack({});
}

function watchScripts() {
  return executeWebpack({ watch: true });
}

const webpackConfig = {
  mode: isRelease ? 'production' : 'development',
  devtool: isRelease ? false : 'inline-source-map',
  output: {
    devtoolModuleFilenameTemplate: '[resource-path]',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: isRelease ? {} : {
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer],
          }),
        },
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      },
    ],
  },
};

function executeWebpack(extraConfig) {
  return gulp.src(['src/concentration.tsx'])
      .pipe(named('concentration.js'))
      .pipe(webpackStream({ ...webpackConfig, ...extraConfig }))
      .pipe(gulp.dest(buildDir));
}

// --- Export tasks ---

module.exports.build = gulp.parallel(buildHtml, buildScripts);
module.exports.watch = gulp.parallel(watchHtml, watchScripts);
