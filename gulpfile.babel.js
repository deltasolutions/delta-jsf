import { promises as fsp } from 'fs';
import execa from 'execa';
import { argv } from 'yargs';
import ghpages from 'gh-pages';
import { task, dest, src, series, watch } from 'gulp';
import ts from 'gulp-typescript';
import * as rollup from 'rollup';
import rollupConfig from './rollup.config.js';
import { compilerOptions as typescriptConfig } from './tsconfig.json';

const execaOptions = { stdout: 'inherit' };

task('clean', async () => fsp.rm('./build', { recursive: true, force: true }));

task('build:lib:js', async () => {
  const { output, ...input } = rollupConfig;
  const bundle = await rollup.rollup(input);
  const outputs = Array.isArray(output) ? output : [output];
  for (let v of outputs) {
    await bundle.write(v);
  }
});

task('build:lib:types', () => {
  return src(['./src/**/*.tsx', '!./src/**/*.stories.*', '!./src/**/*.test.*'])
    .pipe(
      ts({
        ...typescriptConfig,
        declaration: true,
        declarationMap: true,
        emitDeclarationOnly: true
      })
    )
    .pipe(dest('build'));
});

task('build:lib', series('clean', 'build:lib:js', 'build:lib:types'));

task('build:docs:js', async () => {
  await execa.command(
    'build-storybook -c storybook -o build/docs',
    execaOptions
  );
});

task('build:docs', series('clean', 'build:docs:js'));

task('dev:docs', async () => {
  await execa.command(
    'start-storybook -c storybook -p 6006 --ci',
    execaOptions
  );
});

task('lint', async () => {
  await execa.command(
    'npx eslint ./{src,storybook}/**/*.{js,jsx,ts,tsx} --fix',
    execaOptions
  );
  await execa.command(
    'npx prettier ./{src,storybook}/**/*.{js,jsx,ts,tsx} --write',
    execaOptions
  );
});

task('pages:publish', async () => {
  await fsp.writeFile(
    './build/docs/404.html',
    await fsp.readFile('./build/docs/index.html')
  );
  ghpages.publish('./build/docs', e => e && console.log(e));
});

task('pages', series(task('build:docs'), task('pages:publish')));

task('release:git', async () => {
  const { stdout: branch } = await execa.command('git branch --show-current');
  if (branch !== 'master') {
    throw new Error('You have to be on master branch');
  }
  const { type } = argv;
  const { version } = await import('./package.json');
  const target = semver.inc(version, type);
  if (!target) {
    throw new Error(
      'Given release type is incorrect, ' +
        'specify it via `npm run release -- --type <type>`'
    );
  }
  await execa.command(
    `npm version --no-git-tag-version ${target}`,
    execaOptions
  );
  await execa.command(`git commit -am ${target}`, execaOptions);
  await execa.command(`git tag v${target}`, execaOptions);
  await execa.command(`git push origin master`, execaOptions);
  await execa.command(`git push origin ${target}`, execaOptions);
});

task('release:npm', async () => {
  await execa.command(`npm publish`, execaOptions);
});

task('release', series('release:git', 'build:lib', 'release:npm'));
