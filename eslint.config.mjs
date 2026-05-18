import pluginEslintImportX from 'eslint-plugin-import-x';
import pluginTypescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    // the "ignores" patterns have to be defined as the only key of a config object
    // see: https://eslint.org/docs/latest/use/configure/ignore#ignoring-directories
    ignores: [
      // Configuration
      '.coverage',
      '.vscode',
      '.idea',
      // Common directories
      '**/dist',
      '**/node_modules',
      // Demo-related directories
      'demo/**',
    ],
  },
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
    },
    files: ['{src,tests}/**/*.{js,ts,yml,yaml}'],
    plugins: {
      '@typescript-eslint': pluginTypescriptEslint,
      'import-x': pluginEslintImportX,
    },
    rules: {
      // Use the TypeScript port of 'no-unused-vars' to prevent false positives on abstract methods parameters
      // while keeping consistency with TS native behavior of ignoring parameters starting with '_'.
      // https://typescript-eslint.io/rules/no-unused-vars/
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // eslint-plugin-import-x (maintained fork; avoids vulnerable minimatch 3.x from eslint-plugin-import)
      'import-x/no-default-export': 'error',
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import-x/first': ['error'],
      'import-x/exports-last': ['error'],
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];
