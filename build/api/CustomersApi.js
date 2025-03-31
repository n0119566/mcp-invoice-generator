import axios from "axios";
export async function getAllCustomers() {
    try {
        const { data } = await axios.get("http://localhost:3000/api/customers/");
        return data;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
export async function getOrdersForCustomer(customerId) {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/customers/${customerId}/orders`);
        return data;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
export async function getCustomerByName(customerName) {
    try {
        const { data } = await axios.get(`http://localhost:3000/api/customers?name=${customerName}`);
        return data;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
