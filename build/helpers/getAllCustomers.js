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
