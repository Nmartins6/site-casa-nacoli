import astro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Regras recomendadas para arquivos .astro
  ...astro.configs.recommended,

  // Desliga regras do ESLint que conflitam com Prettier
  eslintConfigPrettier,

  // Pastas ignoradas
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  },
];
