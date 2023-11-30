import { z } from "zod";

export const transactionSchema = z.object({
  userEmail: z.string(),
  userId: z.string(),
  amount: z.number(),
  cartProductsDetails: z.array(
    z.object({
      productId: z.string(),
      productPrice: z.number(),
      productQuantity: z.number(),
    })
  ),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
