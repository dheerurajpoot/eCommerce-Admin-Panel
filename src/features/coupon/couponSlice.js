import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getCoupons = createAsyncThunk(
	"coupon/get-coupons",
	async (thunkAPI) => {
		try {
			return await couponService.getCoupons();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const initialState = {
	coupons: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const couponSlice = createSlice({
	name: "coupons",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCoupons.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCoupons.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.coupons = action.payload;
			})
			.addCase(getCoupons.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});
export default couponSlice.reducer;
