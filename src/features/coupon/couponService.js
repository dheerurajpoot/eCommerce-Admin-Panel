import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getCoupons = async () => {
	try {
		const response = await axios.get(`${base_url}coupon/`, config);
		return response.data;
	} catch (error) {
		console.error("Error fetching Coupons:", error);
		throw error;
	}
};
const createCoupon = async (coupon) => {
	try {
		const response = await axios.post(`${base_url}coupon/`, coupon, config);
		return response.data;
	} catch (error) {
		console.error("Error creating coupon:", error);
		throw error;
	}
};
const deleteCoupon = async (id) => {
	try {
		const response = await axios.delete(`${base_url}coupon/${id}`, config);
		return response.data;
	} catch (error) {
		console.error("Error in deleting:", error);
		throw error;
	}
};
const couponService = {
	getCoupons,
	createCoupon,
	deleteCoupon,
};
export default couponService;
