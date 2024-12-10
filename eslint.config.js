import eslint from '@eslint/js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/semi': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'space-infix-ops': ['error'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-function-paren': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'never', prev: 'class', next: '*' },
        { blankLine: 'always', prev: 'import', next: 'class' },
        { blankLine: 'always', prev: '*', next: 'export' },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'space-in-parens': ['error', 'never'],
    },
  }
)
