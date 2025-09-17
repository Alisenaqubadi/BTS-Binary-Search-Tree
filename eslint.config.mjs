// eslint.config.js (or .mjs if you prefer)
import js from '@eslint/js'
import globals from 'globals'
import pluginPrettier from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**'], // ✅ ignore build folder
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error', // Prettier formatting
    },
    extends: [js.configs.recommended, prettier],
  },
])
