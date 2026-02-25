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
  id: string;
  slug: string;
  title: string;
  summary: string;
  category:
    | "personalizados"
    | "impressos"
    | "identidade-visual"
    | "sites"
    | "decoracao"
    | "brindes"
    | "fotografia"
    | "servicos";
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: string;
  images: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  whatsappMessage?: string;
  bodyContent?: string;
  render?: () => Promise<{ Content: any }>;
}
