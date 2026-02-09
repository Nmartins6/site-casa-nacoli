import type { Product } from "@/shared/domain/product";

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getFeatured(): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  getRelated(slug: string, limit?: number): Promise<Product[]>;
}
