import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: null;

const initialState = {
	user: getUserFromLocalStorage,
	orders: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const login = createAsyncThunk(
	"auth/admin-login",
	async (user, thunkAPI) => {
		try {
			return await authService.login(user);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const logOut = createAsyncThunk(
	"auth/admin-logout",
	async (thunkAPI) => {
		try {
			return await authService.logOut();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getOrders = createAsyncThunk(
	"order/get-orders",
	async (thunkAPI) => {
		try {
			return await authService.getOrders();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.user = action.payload;
				state.message = "Success";
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(logOut.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logOut.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.user = action.payload;
				state.message = "Success";
			})
			.addCase(logOut.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(getOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
				state.message = "Success";
			})
			.addCase(getOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});

export default authSlice.reducer;
