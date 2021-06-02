import process from 'process';

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

import babelConfig from './babel.config';

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'];

export default {
  input: './src/index.tsx',

  output: [
    { file: './build/index.js', format: 'es' },
    { file: './build/index.min.js', format: 'es', plugins: [terser()] },
    { file: './build/index.cjs', format: 'cjs' },
    { file: './build/index.min.cjs', format: 'cjs', plugins: [terser()] }
  ],

  plugins: [
    nodeResolve({
      extensions,
      customResolveOptions: {
        moduleDirectory: ['node_modules', process.cwd()]
      }
    }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      ...babelConfig
    }),
    replace(
      Object.entries(process.env).reduce(
        (prev, [k, v]) => ({
          ...prev,
          [`process.env.${k}`]: JSON.stringify(v)
        }),
        {}
      )
    )
  ],

  external: ['react', 'react-dom', 'ajv', 'json-schema-ref-parser'],

  onwarn: (warning, rollupWarn) => {
    if (!['CIRCULAR_DEPENDENCY', 'THIS_IS_UNDEFINED'].includes(warning.code)) {
      rollupWarn(warning);
    }
  }
};
