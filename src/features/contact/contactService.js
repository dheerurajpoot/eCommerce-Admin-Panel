import axios from "axios";
import { base_url } from "../../utils/base_url";

const getContacts = async () => {
	try {
		const response = await axios.get(`${base_url}contact`);
		return response.data;
	} catch (error) {
		console.error("Error fetching contacts:", error);
		throw error;
	}
};

const contactService = {
	getContacts,
};
export default contactService;
