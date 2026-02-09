import { ContentCollectionProductRepository } from "@/shared/infrastructure/content-collection-product-repository";

// Singleton instance
const productRepository = new ContentCollectionProductRepository();

export const container = {
  productRepository,
};
