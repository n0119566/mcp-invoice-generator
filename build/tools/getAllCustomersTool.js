import { getAllCustomers } from "../api/CustomersApi.js";
export const getAllCustomersTool = async () => {
    try {
        const customers = await getAllCustomers();
        if (customers.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: "No customers found",
                    },
                ],
            };
        }
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(customers, null, 2),
                },
            ],
        };
    }
    catch (error) {
        console.error("Error fetching customers:", error);
        return {
            content: [
                {
                    type: "text",
                    text: "Failed to retrieve customers",
                },
            ],
        };
    }
};
