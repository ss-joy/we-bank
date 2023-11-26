export interface ApiResponse {
  status: "success" | "error";
  data?: unknown;
  message:
    | "User created successfully"
    | "Some error happend. Please check details."
    | "User not found"
    | "No products found yet"
    | "Showing list of products"
    | "Please enter all the required informations.."
    | "Could not add product to database. Probaby some server error. Please try again."
    | "Product added successfully!!"
    | "Url/method not supported!"
    | "Something went wrong. Please try again!"
    | "Could sign up the user"
    | "Showing details of single product"
    | "This user is already registered"
    | "OK"
    | "Insufficient balance"
    | "transaction successful"
    | "transaction failed"
    | "Showing all products transactions"
    | "No transactions found. Buy something first..";
  error?: {
    errorCode: number;
    errorBody?: any;
  };
}
