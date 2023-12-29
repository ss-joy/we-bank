import User from "@/models/user-model";
import { ProductSchemaType } from "@/schema/bank-transaction-data-schema";

export async function trasnsactMoneyToEachSeller(product: ProductSchemaType) {
  try {
    const productSeller = await User.findOne({
      userEcommerceId: product.productSellerId,
    });
    if (!productSeller) {
      throw new Error("could not find seller id");
    }

    const update = await User.findOneAndUpdate(
      { userEcommerceId: productSeller.userEcommerceId },
      {
        balance:
          productSeller.balance +
          product.productQuantity * product.productPrice,
      }
    );
    if (!update) {
      throw new Error("could not increment seller balance");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("error in transaction func");
  }
}
