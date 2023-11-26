import { z } from "zod";

export const transactionSchema = z.object({
  userEmail: z.string(),
  userId: z.string(),
  amount: z.number(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
