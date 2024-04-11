import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getProducts = async () => {
	try {
		const response = await axios.get(`${base_url}product/allproducts`);
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
};
const createProducts = async (product) => {
	try {
		const response = await axios.post(
			`${base_url}product/`,
			product,
			config
		);
		return response.data;
	} catch (error) {
		console.error("Error creating brand:", error);
		throw error;
	}
};

const productService = {
	getProducts,
	createProducts,
};
export default productService;
