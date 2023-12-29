import { z } from "zod";

export const BanktransactionSchema = z.object({
  buyerEmail: z.string(),
  buyerId: z.string(),
  totalCost: z.number(),
  cartProductsDetails: z.array(
    z.object({
      productId: z.string(),
      productPrice: z.number(),
      productQuantity: z.number(),
      productSellerId: z.string(),
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
