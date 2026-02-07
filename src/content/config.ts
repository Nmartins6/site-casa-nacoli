import { defineCollection, z } from "astro:content";

const optionSchema = z.object({
  key: z
    .enum(["color", "size", "paper", "finish", "quantity"])
    .describe("Tipo da opção de variação"),
  label: z.string().min(1).describe("Nome amigável para exibir no site"),
  values: z.array(z.string().min(1)).min(1),
});

const variantSchema = z.object({
  sku: z.string().min(1),
  options: z.object({
    color: z.string().min(1).optional(),
    size: z.string().min(1).optional(),
    paper: z.string().min(1).optional(),
    finish: z.string().min(1).optional(),
    quantity: z.string().min(1).optional(),
  }),
  // preço pode ser opcional no MVP (muito produto é "sob consulta")
  priceCents: z.number().int().nonnegative().optional(),
  available: z.boolean().default(true),
});

const products = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z
      .enum(["personalizados", "impressos", "identidade-visual", "sites", "decoracao"])
      .default("personalizados"),
    featured: z.boolean().default(false),

    // SEO básico por produto
    seoTitle: z.string().min(1).optional(),
    seoDescription: z.string().min(1).optional(),

    // mídia
    coverImage: z.string().min(1).optional(), // depois podemos trocar para Image() do Astro
    gallery: z.array(z.string().min(1)).default([]),

    // variações
    options: z.array(optionSchema).default([]),
    variants: z.array(variantSchema).default([]),

    // call to action
    whatsappMessage: z.string().min(1).optional(),
  }),
});

export const collections = { products };
