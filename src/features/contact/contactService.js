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
const getContact = async (id) => {
	try {
		const response = await axios.get(`${base_url}contact/${id}`, config);
		return response.data;
	} catch (error) {
		console.error("Error in fetching Enquiry:", error);
		throw error;
	}
};
const updateContact = async (enq) => {
	try {
		const response = await axios.put(
			`${base_url}contact/${enq.id}`,
			{ status: enq.enqData },
			config
		);
		return response.data;
	} catch (error) {
		console.error("Error in updating Enquiry:", error);
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
	getContact,
	updateContact,
	deleteContact,
};
export default contactService;
