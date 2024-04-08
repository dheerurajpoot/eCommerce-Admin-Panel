import axios from "axios";
import { base_url } from "../../utils/base_url";

const getColors = async () => {
	try {
		const response = await axios.get(`${base_url}color`);
		return response.data;
	} catch (error) {
		console.error("Error fetching colors:", error);
		throw error;
	}
};

const colorService = {
	getColors,
};
export default colorService;
