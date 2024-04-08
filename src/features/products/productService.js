import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUsers = async () => {
	try {
		const response = await axios.get(`${base_url}product/allproducts`, {});
		return response.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};

const customerService = {
	getUsers,
};
export default customerService;
