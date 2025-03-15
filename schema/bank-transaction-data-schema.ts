import { z } from "zod";

export const BanktransactionSchema = z.object({
  buyerId: z.string().min(1, "Buyer ID is required"),
  totalTransactionAmount: z
    .number()
    .positive("Transaction amount must be positive"),
  expectedDate: z.string(),
  orderedProducts: z.array(
    z.object({
      orderedProductsCount: z
        .number()
        .int()
        .positive("Ordered products count must be a positive integer"),
      totalCostForTheProduct: z
        .number()
        .positive("Total cost must be a positive number"),
      productId: z.string().min(1, "Product ID is required"),
      sellerId: z.string().min(1, "Seller ID is required"),
    })
  ),
});
export const ProductSchema = z.object({
  productId: z.string(),
  productPrice: z.number(),
  productQuantity: z.number(),
  productSellerId: z.string(),
});
export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type BanktransactionSchemaType = z.infer<typeof BanktransactionSchema>;
