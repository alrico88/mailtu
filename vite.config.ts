import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    ignorePatterns: ['dist/**', 'coverage/**'],
    singleQuote: true,
    sortPackageJson: true,
  },
  lint: {
    ignorePatterns: ['dist/**', 'coverage/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: ['@stylistic/eslint-plugin'],
    rules: {
      curly: ['error', 'all'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: '*', next: ['block-like', 'export'] },
        { blankLine: 'always', prev: ['block-like', 'export', 'import'], next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
      ],
    },
  },
  test: {
    coverage: {
      include: ['src/**'],
      reporter: ['text', 'lcov'],
    },
  },
  pack: {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
  },
  staged: {
    '*': 'vp check --fix',
  },
});
