import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getCategory = async () => {
	try {
		const response = await axios.get(`${base_url}category`);
		return response.data;
	} catch (error) {
		console.error("Error fetching category:", error);
		throw error;
	}
};
const createCategory = async (category) => {
	try {
		const response = await axios.post(
			`${base_url}category/`,
			category,
			config
		);
		return response.data;
	} catch (error) {
		console.error("Error creating category:", error);
		throw error;
	}
};
const deleteCategory = async (id) => {
	try {
		const response = await axios.delete(
			`${base_url}category/${id}`,
			config
		);
		return response.data;
	} catch (error) {
		console.error("Error in deleting category:", error);
		throw error;
	}
};
const categoryService = {
	getCategory,
	createCategory,
	deleteCategory,
};
export default categoryService;
