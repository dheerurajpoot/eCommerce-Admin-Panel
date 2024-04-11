import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBrands = async () => {
	try {
		const response = await axios.get(`${base_url}brand`, {});
		return response.data;
	} catch (error) {
		console.error("Error fetching brands:", error);
		throw error;
	}
};
const createBrand = async (brand) => {
	try {
		const response = await axios.post(`${base_url}brand/`, brand, config);
		return response.data;
	} catch (error) {
		console.error("Error creating Brand:", error);
		throw error;
	}
};
const brandService = {
	getBrands,
	createBrand,
};
export default brandService;
