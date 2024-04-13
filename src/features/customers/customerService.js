import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig.js";

const getUsers = async () => {
	try {
		const response = await axios.get(`${base_url}user/all-users`, config);
		return response.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};
const deleteUser = async (id) => {
	try {
		const response = await axios.delete(`${base_url}user/${id}`, config);
		return response.data;
	} catch (error) {
		console.error("Error in deleting user:", error);
		throw error;
	}
};

const customerService = {
	getUsers,
	deleteUser,
};
export default customerService;
