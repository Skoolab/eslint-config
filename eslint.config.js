import eslint from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import eslintPluginImport from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import functionalPlugin from 'eslint-plugin-functional'
import tseslint from 'typescript-eslint'
import noDirectReturnRule from './custom-rules/no-direct-return.js'
import methodCallOrderRule from './custom-rules/method-call-order.js'
import interfacesInSeparateFilesRule from './custom-rules/interfaces-in-separate-files.js'
import preferEnumRule from './custom-rules/prefer-enum.js'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  [
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
      files: ['src/**'],
      plugins: {
        '@stylistic/ts': stylisticTs,
        import: eslintPluginImport,
        prettier: prettierPlugin,
        functional: functionalPlugin,
        custom: {
          rules: {
            'no-direct-return': noDirectReturnRule,
            'method-call-order': methodCallOrderRule,
            'interfaces-in-separate-files': interfacesInSeparateFilesRule,
            'prefer-enum': preferEnumRule,
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
        curly: ['error', 'all'],
        'max-lines': [
          'error',
          { max: 150, skipComments: true, skipBlankLines: true },
        ],
        complexity: ['error', 10],
        'no-eval': 'error',
        'require-await': 'off',
        'no-implied-eval': 'error',
        'no-unreachable': 'error',
        'no-console': ['warn'],
        'no-magic-numbers': ['warn', { ignore: [0, 1], detectObjects: true }],
        'functional/immutable-data': ['error'],
        'init-declarations': ['warn', 'always'],
        'no-new': 'error',
        'max-params': ['warn', 3],
        'require-atomic-updates': 'error',

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
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'class',
            format: ['PascalCase'],
            custom: {
              regex: '^[A-Z][a-zA-Z0-9]*$',
              match: true,
            },
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^[A-Z][a-zA-Z0-9]*$',
              match: true,
            },
          },
          {
            selector: 'method',
            format: ['camelCase'],
            custom: {
              regex: '^[a-z][a-zA-Z0-9]*$',
              match: true,
            },
          },
          {
            selector: 'variable',
            format: ['camelCase'],
            custom: {
              regex: '^[a-z][a-zA-Z0-9]*$',
              match: true,
            },
          },
        ],
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/no-deprecated': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { args: 'all', argsIgnorePattern: '^_' },
        ],

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
            groups: [['builtin', 'external'], ['internal']],
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
            'newlines-between': 'never',
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
        'no-restricted-syntax': [
          'error',
          {
            selector: 'ExportDefaultDeclaration',
            message:
              'Export default is not allowed. Use named exports with {} instead.',
          },
          {
            selector: 'ExportNamedDeclaration > ClassDeclaration',
            message:
              'Do not export classes directly. Use named exports with {}.',
          },
        ],
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: 'import', next: '*' },
          { blankLine: 'never', prev: 'import', next: 'import' },
          { blankLine: 'always', prev: '*', next: 'export' },
        ],

        // Custom rules
        'custom/no-direct-return': ['error'],
        'custom/method-call-order': 'error',
        'custom/interfaces-in-separate-files': 'error',
        'custom/prefer-enum': 'warn',
      },
      linterOptions: {
        noInlineConfig: false,
        reportUnusedDisableDirectives: true,
      },
    },
    {
      files: ['**/index.ts'],
      rules: {
        'padding-line-between-statements': 'off',
      },
    },
    {
      files: ['**/**.{spec,test}.ts'],
      rules: {
        'space-before-function-paren': 'off',
      },
    },
  ]
)
