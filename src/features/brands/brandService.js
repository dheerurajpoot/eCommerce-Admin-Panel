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
const getABrand = async (id) => {
	try {
		const response = await axios.get(`${base_url}brand/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error in geting a Brand:", error);
		throw error;
	}
};
const updateBrand = async (brand) => {
	try {
		const response = await axios.put(
			`${base_url}brand/${brand.id}`,
			{ title: brand.brandData.title },
			config
		);
		return response.data;
	} catch (error) {
		console.error("Error in updating Brand:", error);
		throw error;
	}
};
const deleteBrand = async (id) => {
	try {
		const response = await axios.delete(`${base_url}brand/${id}`, config);
		return response.data;
	} catch (error) {
		console.error("Error in deleting Brand:", error);
		throw error;
	}
};
const brandService = {
	getBrands,
	createBrand,
	getABrand,
	updateBrand,
	deleteBrand,
};
export default brandService;
