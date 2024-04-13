import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getColors = async () => {
	try {
		const response = await axios.get(`${base_url}color`);
		return response.data;
	} catch (error) {
		console.error("Error fetching colors:", error);
		throw error;
	}
};
const createColor = async (color) => {
	try {
		const response = await axios.post(`${base_url}color/`, color, config);
		return response.data;
	} catch (error) {
		console.error("Error creating color:", error);
		throw error;
	}
};
const deleteColor = async (id) => {
	try {
		const response = await axios.delete(`${base_url}color/${id}`, config);
		return response.data;
	} catch (error) {
		console.error("Error creating color:", error);
		throw error;
	}
};
const colorService = {
	getColors,
	createColor,
	deleteColor,
};
export default colorService;
