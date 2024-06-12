import { configs, defineConfig } from "@orbitkit/eslint";

export default defineConfig(...configs.base, {
  rules: {
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-require-imports": "off",
  },
});
