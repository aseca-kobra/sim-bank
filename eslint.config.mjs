// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  {
    // Override all rules to be "off"
    rules: Object.fromEntries(
      // Get all rule keys from the various configs and set them to "off"
      Object.keys({
        ...eslint.configs.recommended.rules,
        ...tseslint.configs.recommendedTypeChecked.reduce((acc, config) => ({ ...acc, ...config.rules }), {}),
        ...eslintPluginPrettierRecommended.rules,
      }).map(rule => [rule, 'off'])
    ),
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);