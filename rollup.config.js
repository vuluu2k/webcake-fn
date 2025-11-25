import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  // ES Module build (minified)
  {
    input: 'index.js',
    output: {
      file: 'dist/webcake-fn.esm.min.js',
      format: 'es',
      banner: '/* WebCake FN - Function Call Library | MIT License */',
    },
    plugins: [
      nodeResolve(),
      terser({
        compress: {
          drop_console: false,
          passes: 2
        },
        format: {
          comments: /^!/
        }
      })
    ]
  },
  // UMD build (minified) for browser
  {
    input: 'index.js',
    output: {
      file: 'dist/webcake-fn.umd.min.js',
      format: 'umd',
      name: 'WebCakeFn',
      exports: 'named',
      banner: '/* WebCake FN - Function Call Library | MIT License */',
    },
    plugins: [
      nodeResolve(),
      terser({
        compress: {
          drop_console: false,
          passes: 2
        },
        format: {
          comments: /^!/
        }
      })
    ]
  },
  // ES Module build (unminified for development)
  {
    input: 'index.js',
    output: {
      file: 'dist/webcake-fn.esm.js',
      format: 'es',
      banner: '/* WebCake FN - Function Call Library | MIT License */',
    },
    plugins: [
      nodeResolve()
    ]
  },
  // UMD build (unminified for development)
  {
    input: 'index.js',
    output: {
      file: 'dist/webcake-fn.umd.js',
      format: 'umd',
      name: 'WebCakeFn',
      exports: 'named',
      banner: '/* WebCake FN - Function Call Library | MIT License */',
    },
    plugins: [
      nodeResolve()
    ]
  }
];

