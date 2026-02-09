export type ProductOptionType = "color" | "size" | "paper" | "finish" | "quantity";

export interface ProductOption {
  key: ProductOptionType;
  label: string;
  values: string[];
}

export interface ProductVariant {
  sku: string;
  options: Partial<Record<ProductOptionType, string>>;
  priceCents?: number;
  available: boolean;
}

export interface Product {
  id: string; // slug
  slug: string;
  title: string;
  summary: string;
  category: "personalizados" | "impressos" | "identidade-visual" | "sites" | "decoracao";
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: string;
  gallery: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  whatsappMessage?: string;
  bodyContent?: string; // HTML or Markdown content
  render?: () => Promise<{ Content: any }>; // Astro specific render function
}
