import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const login = async (user) => {
	const response = await axios.post(`${base_url}user/admin-login`, user, {
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const getOrders = async () => {
	try {
		const response = await axios.get(`${base_url}user/all-orders`, config);
		return response.data;
	} catch (error) {
		console.error("Error fetching orders:", error);
		throw error;
	}
};
const updateOrderStatus = async (orderData) => {
	try {
		const response = await axios.put(
			`${base_url}user/orders/order-status/${orderData.id}`,
			{
				id: orderData?.id,
				status: orderData?.orderStatus,
				email: orderData?.email,
			},
			config
		);
		return response.data;
	} catch (error) {
		console.error("Error in Updating order status:", error);
		throw error;
	}
};
const logOut = async () => {
	const response = await axios.get(`${base_url}user/logout`);
	return response.data;
};

const authService = {
	login,
	getOrders,
	updateOrderStatus,
	logOut,
};
export default authService;
