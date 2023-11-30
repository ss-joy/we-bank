import { Schema, model, models } from "mongoose";
import { number } from "zod";

interface IProductItem {
  productId: string;
  productQuantity: number;
  productPrice: number;
}
interface IShoppingTransaction {
  trxId: string;
  total_cost: number;
  ecom_user_id: string;
  email: string;
  trx_date: Date;
  transactionsItemsLists: [IProductItem];
}
const ProductItem = new Schema<IProductItem>({
  productId: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});

const shoppingTransaction = new Schema<IShoppingTransaction>({
  trxId: {
    type: String,
    required: true,
  },
  total_cost: {
    type: Number,
    required: true,
  },
  ecom_user_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  trx_date: { type: Date, required: true },
  transactionsItemsLists: {
    type: [ProductItem],
    required: true,
  },
});

const ShoppingTransaction =
  models.ShoppingTransaction ||
  model<IShoppingTransaction>("ShoppingTransaction", shoppingTransaction);

export default ShoppingTransaction;
