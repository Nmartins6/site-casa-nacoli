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
    a: "Sim, enviamos via Correios ou transportadora. O frete é calculado conforme o CEP.",
  },
];

/**
 * Portfólio Digital — sites, logos, artes e identidades visuais desenvolvidos.
 * Para adicionar um novo trabalho, basta incluir um novo objeto nesta lista.
 *
 * Campos:
 *   title    — nome do projeto
 *   category — tipo: "Site", "Logo", "Arte", "Identidade Visual", etc.
 *   image    — caminho relativo a /images/digital/ (adicione a imagem lá)
 *   url      — (opcional) link para o projeto ao vivo
 */
export const DIGITAL_PORTFOLIO: {
  title: string;
  category: string;
  image: string;
  contain?: boolean;
  url?: string;
}[] = [
  {
    title: "Site Casa Nacoli",
    category: "Site",
    image: "casa-nacoli-logo.webp",
    contain: true,
    url: "https://casanacoli.com.br",
  },
  {
    title: "Site Slim Pé",
    category: "Site",
    image: "logo.webp",
    contain: true,
    url: "https://slimpe.com",
  },
];
