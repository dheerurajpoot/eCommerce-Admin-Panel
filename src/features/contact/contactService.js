import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getContacts = async () => {
	try {
		const response = await axios.get(`${base_url}contact`);
		return response.data;
	} catch (error) {
		console.error("Error fetching Enquiries:", error);
		throw error;
	}
};
const deleteContact = async (id) => {
	try {
		const response = await axios.delete(`${base_url}contact/${id}`, config);
		return response.data;
	} catch (error) {
		console.error("Error in deleting Enquiry:", error);
		throw error;
	}
};

const contactService = {
	getContacts,
	deleteContact,
};
export default contactService;
