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
		console.error("Error creating product:", error);
		throw error;
	}
};
const deleteProduct = async (id) => {
	try {
		const response = await axios.delete(`${base_url}product/${id}`, config);
		return response.data;
	} catch (error) {
		console.error("Error in deleting product:", error);
		throw error;
	}
};

const productService = {
	getProducts,
	createProducts,
	deleteProduct,
};
export default productService;
