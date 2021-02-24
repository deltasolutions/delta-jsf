import { promises as fsp } from 'fs';

import { task, dest, src, series } from 'gulp';
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

task('build:lib', series('clean', 'build:lib:js', 'build:lib:types'));
