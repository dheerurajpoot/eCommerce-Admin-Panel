import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/products/productSlice";
import brandReducer from "../features/brands/brandSlice";
import categoryReducer from "../features/category/categorySlice";
import colorReducer from "../features/color/colorSlice";
import contactReducer from "../features/contact/contactSlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		customer: customerReducer,
		product: productReducer,
		brand: brandReducer,
		category: categoryReducer,
		color: colorReducer,
		coupon: couponReducer,
		contact: contactReducer,
		upload: uploadReducer,
	},
});
