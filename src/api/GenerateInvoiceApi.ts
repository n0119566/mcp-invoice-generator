import axios from "axios";
import { IOrder } from "../interaces/OrderInterface.js";

export async function generateInvoiceApi(
  orders: IOrder,
  outputPathAndFile: string
) {
  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/invoice",
      { orders, outputPathAndFile },
      {
        responseType: "blob",
      }
    );

    return data;
  } catch (error) {
    console.error("Error generating invoice:", error);
    // Return empty blob with error message
    return {
      success: false,
      filePath: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
