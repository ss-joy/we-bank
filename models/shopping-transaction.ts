import { Schema, model, models } from "mongoose";
interface IShoppingTransaction {
  trxId: string;
  total_cost: number;
  userId: string;
  email: string;
  trx_date: Date;
}
const shoppingTransaction = new Schema<IShoppingTransaction>({
  trxId: {
    type: String,
    required: true,
  },
  total_cost: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  trx_date: { type: Date, required: true },
});

const ShoppingTransaction =
  models.ShoppingTransaction ||
  model<IShoppingTransaction>("ShoppingTransaction", shoppingTransaction);

export default ShoppingTransaction;
