import { promises as fsp } from 'fs';
import execa from 'execa';
import { argv } from 'yargs';

import { task, dest, src, series, watch } from 'gulp';
import ts from 'gulp-typescript';

import * as rollup from 'rollup';
import rollupConfig from './rollup.config.js';

task('clean', async () => fsp.rmdir('./build', { recursive: true }));

task('build:lib:js', async () => {
  const { output, ...input } = rollupConfig;
  const bundle = await rollup.rollup(input);
  const outputs = Array.isArray(output) ? output : [output];
  for (let v of outputs) {
    await bundle.write(v);
  }
});

task('build:lib:types', () => {
  return src('./src/**/*.tsx')
    .pipe(
      ts({
        ...require('./tsconfig.json').compilerOptions,
        declaration: true,
        declarationMap: true,
        emitDeclarationOnly: true
      })
    )
    .pipe(dest('build'));
});

task('start:lib', () => {
  watch(['src/**/*'], { ignoreInitial: false }, series('build:lib:js', 'build:lib:types'));
});

task('build:lib', series('clean', 'build:lib:js', 'build:lib:types'));

task('release:git', async () => {
  const version = argv['release-version'];
  if (!version) {
    throw new Error(
      'Specify version: `npm run release -- --release-version <version>`'
    );
  }
  const options = { stdout: 'inherit' };
  await execa.command(`npm version ${version}`, options);
  await execa.command(`git push origin master`, options);
  await execa.command(`git push origin v${version}`, options);
});

task('release:npm', async () => {
  const options = { stdout: 'inherit' };
  await execa.command(`npm publish`, options);
});

task('release', series('release:git', 'build:lib', 'release:npm'));
