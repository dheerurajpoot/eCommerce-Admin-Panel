import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const uploadImage = async (data) => {
	try {
		const response = await axios.post(`${base_url}upload/`, data, config);
		return response.data;
	} catch (error) {
		console.error("Error while upload images:", error);
		throw error;
	}
};

const deleteImage = async (id) => {
	try {
		const response = await axios.delete(`${base_url}upload/${id}`, config);
		return response.data;
	} catch (error) {
		console.error("Error while deleting images:", error);
		throw error;
	}
};

const uploadService = {
	uploadImage,
	deleteImage,
};
export default uploadService;
