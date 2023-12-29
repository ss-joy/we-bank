import { Schema, model, models } from "mongoose";

interface IProductItem {
  productId: string;
  productQuantity: number;
  productPrice: number;
}
interface IShoppingTransaction {
  trxId: string;
  totalCost: number;
  buyerId: string;
  buyerEmail: string;
  trxDate: Date;
  transactionsItemsLists: [IProductItem];
  trxStatus: string;
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
  totalCost: {
    type: Number,
    required: true,
  },
  buyerId: {
    type: String,
    required: true,
  },
  buyerEmail: {
    type: String,
    required: true,
  },
  trxDate: { required: true, type: Date, default: Date.now },
  trxStatus: {
    type: String,
    enum: ["Pending", "Delivered"],
    default: "Pending",
  },
  transactionsItemsLists: {
    type: [ProductItem],
    required: true,
  },
});

const ShoppingTransaction =
  models.ShoppingTransaction ||
  model<IShoppingTransaction>("ShoppingTransaction", shoppingTransaction);

export default ShoppingTransaction;
