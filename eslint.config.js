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
    },
  }
)
