import { ContentCollectionProductRepository } from "@/shared/infrastructure/content-collection-product-repository";

const productRepository = new ContentCollectionProductRepository();

export const container = {
  productRepository,
};
