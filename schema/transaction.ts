import { z } from "zod";

export const transactionSchema = z.object({
  email: z.string(),
  amount: z.number(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
