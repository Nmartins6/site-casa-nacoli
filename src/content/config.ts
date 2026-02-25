import { defineCollection, z } from "astro:content";

const optionSchema = z.object({
  key: z
    .enum(["color", "size", "paper", "finish", "quantity", "type", "material", "format"])
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
    type: z.string().min(1).optional(),
    material: z.string().min(1).optional(),
    format: z.string().min(1).optional(),
  }),
  priceCents: z.number().int().nonnegative().optional(),
  available: z.boolean().default(true),
});

const products = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z
      .enum([
        "personalizados",
        "impressos",
        "identidade-visual",
        "sites",
        "decoracao",
        "brindes",
        "fotografia",
        "servicos",
      ])
      .default("personalizados"),
    featured: z.boolean().default(false),

    seoTitle: z.string().min(1).optional(),
    seoDescription: z.string().min(1).optional(),

    coverImage: z.string().min(1).optional(),
    images: z.array(z.string().min(1)).default([]),

    options: z.array(optionSchema).default([]),
    variants: z.array(variantSchema).default([]),

    whatsappMessage: z.string().min(1).optional(),
  }),
});

export const collections = { products };
