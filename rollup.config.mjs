import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * This configuration is designed to bundle the Strapi Client for Node.js environments.
 *
 * It produces two outputs: one for the older CommonJS module system and one for the modern ES Module
 * system.
 *
 * Outputs:
 * - CommonJS (dist/bundle.cjs): for environments using `require`.
 *   Compatible with older tools and Node.js versions.
 *   Includes source maps for debugging.
 *
 * - ES Module (dist/bundle.mjs): for modern import/export environments.
 *   Supports tree-shaking for smaller builds.
 *   Includes source maps for debugging.
 *
 * @type {import('rollup').RollupOptions}
 */
const node_build = {
  input: 'src/exports.ts',
  cache: true,
  output: [
    // CommonJS build
    {
      file: 'dist/bundle.cjs',
      format: 'cjs',
      sourcemap: isProduction ? 'hidden' : true,
      exports: 'named',
    },
    // ESM build
    {
      file: 'dist/bundle.mjs',
      format: 'esm',
      sourcemap: isProduction ? 'hidden' : true,
      exports: 'named',
    },
  ],
  external: ['debug'],
  plugins: [
    // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
    nodeResolve({
      browser: false, // "browser" properties in package files are ignored
      preferBuiltins: true, // Prefer built-in modules
    }),
    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs(),
    // Transpile TypeScript to JavaScript
    typescript({ tsconfig: './tsconfig.build.json' }),
    // Replace environment variables
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true,
    }),
    // Minify the output in production
    isProduction && terser(),
  ],
};

/**
 * This configuration is designed to bundle the Strapi Client for browser environments.
 *
 * It produces outputs suitable for browser environments in both CommonJS and ESM formats.
 *
 * Outputs:
 * - CommonJS (dist/bundle.browser.cjs): for environments using `require`.
 * - ES Module (dist/bundle.browser.mjs): for environments with native support for ES Modules.
 *
 * @type {import('rollup').RollupOptions}
 */
const browser_build = {
  input: 'src/exports.ts',
  cache: true,
  output: [
    // CommonJS Browser build
    {
      file: 'dist/bundle.browser.cjs',
      format: 'cjs',
      sourcemap: isProduction ? 'hidden' : true,
      exports: 'named',
    },
    // ESM Browser build
    {
      file: 'dist/bundle.browser.mjs',
      format: 'esm',
      sourcemap: isProduction ? 'hidden' : true,
      exports: 'named',
    },
  ],
  external: ['debug'],
  plugins: [
    // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
    nodeResolve({
      browser: true, // Only resolve browser-compatible modules
      preferBuiltins: false, // Disable Node.js built-ins
    }),
    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs(),
    // Transpile TypeScript to JavaScript
    typescript({ tsconfig: './tsconfig.build.json' }),
    // Replace environment variables and add process.browser
    replace({
      'process.browser': true,
      preventAssignment: true,
    }),
    // Minify the output in production
    isProduction && terser(),
  ],
};

/**
 * This configuration is designed to create IIFE format bundles suitable for direct
 * inclusion in web browsers.
 *
 * Outputs:
 * - IIFE Minified (dist/bundle.browser.min.js): Minified JavaScript file containing the entire bundle, optimized
 *   for direct browser usage and embedding, exposed with the global `strapi` variable.
 *
 * External Dependencies:
 * - `debug` is excluded from the bundle and replaced with a no-op function.
 *
 * @type {import('rollup').RollupOptions}
 */
const iife_build = {
  input: 'src/exports.ts',
  cache: true,
  output: [
    {
      file: 'dist/bundle.iife.min.js',
      format: 'iife',
      name: 'strapi',
      sourcemap: true,
      globals: {
        debug: () => () => {}, // Override debug to a no-op function
      },
    },
  ],
  external: ['debug'], // Don't include the debug package in the browser build
  plugins: [
    // Locate modules using the Node resolution algorithm, for using third party modules in node_modules
    nodeResolve({
      browser: true, // Only resolve browser-compatible modules
      preferBuiltins: false, // Disable Node.js built-ins
    }),
    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs(),
    // Transpile TypeScript to JavaScript
    typescript({ tsconfig: './tsconfig.build.json' }),
    // Replace environment variables and add process.browser for browser-specific code
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.browser': true,
      preventAssignment: true,
    }),
    // Minify the output
    terser(),
  ],
};

// Export configurations
export default [node_build, browser_build, iife_build];
