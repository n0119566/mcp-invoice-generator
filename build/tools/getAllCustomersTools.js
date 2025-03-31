// In getAllCustomersTool.ts
import { getAllCustomers } from "../api/CustomersApi.js";
export const getAllCustomersTool = async () => {
    try {
        const customers = await getAllCustomers();
        if (customers.length === 0) {
            return {
                success: false,
                content: [{ type: "text", text: "No customers found" }],
            };
        }
        return {
            success: true,
            count: customers.length,
            content: [{ type: "text", text: JSON.stringify(customers, null, 2) }],
            data: customers, // Optional: include raw data for programmatic use
        };
    }
    catch (error) {
        console.error("Error fetching customers:", error);
        return {
            success: false,
            content: [{ type: "text", text: "Failed to retrieve customers" }],
        };
    }
};
