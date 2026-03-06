export const WHATSAPP_MESSAGE_BUDGET =
  "Olá! Vim pelo site da Casa Nacoli e gostaria de um orçamento.";

export const BACKGROUND_IMAGES = {
  HERO: "/images/background/background.webp",
};

export const FAQ_ITEMS = [
  {
    q: "Qual o prazo de produção?",
    a: "O prazo varia conforme o produto e a quantidade. Em média, personalizados levam de 5 a 7 dias úteis após aprovação da arte.",
  },
  {
    q: "Vocês fazem a arte?",
    a: "Sim! Podemos criar a arte do zero ou ajustar a que você já tem. Os valores de criação são combinados à parte.",
  },
  {
    q: "Qual a quantidade mínima?",
    a: "Depende do item. Muitos personalizados (como canecas) fazemos a partir de 1 unidade. Também fazemos impressos gráficos a partir de 1 unidade, mas geralmente o valor a partir de 50 unidades fica mais em conta.",
  },
  {
    q: "Enviam para outras cidades?",
    a: "Sim, enviamos via correios ou transportadora. O frete é calculado conforme o CEP.",
  },
];

type DigitalItem = {
  title: string;
  category: string;
  image: string;
  contain?: boolean;
  url?: string;
};

/**
 * Sites desenvolvidos.
 * Campos:
 *   title    — nome do projeto
 *   category — tipo (ex: "Institucional", "E-commerce")
 *   image    — caminho relativo a /images/digital/
 *   url      — (opcional) link ao vivo
 */
export const DIGITAL_PORTFOLIO_SITES: DigitalItem[] = [
  {
    title: "Site Casa Nacoli",
    category: "Institucional",
    image: "casa-nacoli-logo.webp",
    contain: true,
    url: "https://casanacoli.com.br",
  },
  {
    title: "Site Slim Pé",
    category: "Institucional",
    image: "logo.webp",
    contain: true,
    url: "https://slimpe.com",
  },
];

/**
 * Trabalhos de design (logos, artes, identidades visuais, etc.).
 * Campos:
 *   title    — nome do projeto
 *   category — tipo (ex: "Logo", "Identidade Visual", "Arte")
 *   image    — caminho relativo a /images/digital/
 *   url      — (opcional) link ao vivo
 */
export const DIGITAL_PORTFOLIO_DESIGN: DigitalItem[] = [
  {
    title: "Identidade Visual Casa Nacoli",
    category: "Identidade Visual",
    image: "casa-nacoli-logo.webp",
    contain: true,
    url: "https://casanacoli.com.br",
  },
  {
    title: "Identidade Visual Slim Pé",
    category: "Identidade Visual",
    image: "logo.webp",
    contain: true,
    url: "https://slimpe.com",
  },
];
