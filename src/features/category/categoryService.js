import axios from "axios";
import { base_url } from "../../utils/base_url";

const getCategory = async () => {
	try {
		const response = await axios.get(`${base_url}category`, {});
		return response.data;
	} catch (error) {
		console.error("Error fetching category:", error);
		throw error;
	}
};

const categoryService = {
	getCategory,
};
export default categoryService;
