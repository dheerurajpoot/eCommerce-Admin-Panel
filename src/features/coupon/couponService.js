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

const couponService = {
	getCoupons,
};
export default couponService;
