import eslint from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import eslintPluginImport from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'
import noDirectReturnRule from './custom-rules/no-direct-return.js'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['src/**'],
    plugins: {
      '@stylistic/ts': stylisticTs,
      import: eslintPluginImport,
      prettier: prettierPlugin,
      custom: {
        rules: {
          'no-direct-return': noDirectReturnRule,
        },
      },
    },
    rules: {
      // Prettier rules
      'prettier/prettier': ['error'],

      // ESLint rules
      'eol-last': ['error', 'always'],
      'linebreak-style': ['error', 'unix'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-multi-spaces': ['error'],
      'no-trailing-spaces': ['error'],
      'space-infix-ops': ['error'],
      'space-before-function-paren': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],

      // TypeScript ESLint rules
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit' },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: false },
      ],
      '@typescript-eslint/typedef': [
        'error',
        {
          propertyDeclaration: true,
          variableDeclaration: false,
          parameter: false,
          memberVariableDeclaration: true,
        },
      ],
      '@typescript-eslint/no-inferrable-types': 'off',

      // Stylistic rules
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/semi': ['error', 'never'],
      '@stylistic/ts/type-annotation-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],

      // Import plugin rules
      'import/order': [
        'error',
        {
          groups: [['builtin'], ['external'], ['internal']],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],

      // Additional rules
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'ignore',
        },
      ],

      // Custom rules
      'custom/no-direct-return': ['error'],
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
  }
)
