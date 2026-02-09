import type { ProductRepository } from "@/shared/data/productRepository";
import type { Product, ProductOptionType } from "@/shared/domain/product";
import { getCollection } from "astro:content";

export class ContentCollectionProductRepository implements ProductRepository {
  private toDomain(collectionItem: any): Product {
    return {
      id: collectionItem.slug,
      slug: collectionItem.slug,
      title: collectionItem.data.title,
      summary: collectionItem.data.summary,
      category: collectionItem.data.category,
      featured: collectionItem.data.featured,
      seoTitle: collectionItem.data.seoTitle,
      seoDescription: collectionItem.data.seoDescription,
      coverImage: collectionItem.data.coverImage,
      gallery: collectionItem.data.gallery,
      options: collectionItem.data.options.map((opt: any) => ({
        key: opt.key as ProductOptionType,
        label: opt.label,
        values: opt.values,
      })),
      variants: collectionItem.data.variants.map((v: any) => ({
        sku: v.sku,
        options: v.options,
        priceCents: v.priceCents,
        available: v.available,
      })),
      whatsappMessage: collectionItem.data.whatsappMessage,
      render: collectionItem.render,
    };
  }

  async getAll(): Promise<Product[]> {
    const items = await getCollection("products");
    return items.map(this.toDomain);
  }

  async getFeatured(): Promise<Product[]> {
    const products = await this.getAll();
    return products.filter((p) => p.featured);
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const items = await getCollection("products");
    const item = items.find((p) => p.slug === slug);
    return item ? this.toDomain(item) : null;
  }

  async getRelated(slug: string, limit = 3): Promise<Product[]> {
    const all = await this.getAll();
    const current = all.find((p) => p.slug === slug);
    if (!current) return [];

    // Simple strategy: same category, excluding self
    return all.filter((p) => p.category === current.category && p.slug !== slug).slice(0, limit);
  }
}
