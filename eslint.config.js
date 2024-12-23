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
    rules: {},
  }
)
