import pluginImportX from 'eslint-plugin-import-x';
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
      // Demos ship their own ESLint; loading their configs from the repo root breaks `eslint .`
      'demo/**',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
    },
    files: ['{src,tests}/**/*.{js,ts,yml,yaml}'],
    plugins: {
      '@typescript-eslint': pluginTypescriptEslint,
      'import-x': pluginImportX,
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

      // eslint-plugin-import-x (fork of eslint-plugin-import; supports ESLint 10)
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
