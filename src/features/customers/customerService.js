import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUsers = async () => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.get(`${base_url}user/all-users`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};

const customerService = {
	getUsers,
};
export default customerService;