import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const getCategory = createAsyncThunk(
	"category/get-category",
	async (thunkAPI) => {
		try {
			return await categoryService.getCategory();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const createCategory = createAsyncThunk(
	"category/create-categories",
	async (categoryData, thunkAPI) => {
		try {
			return await categoryService.createCategory(categoryData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const deleteCategory = createAsyncThunk(
	"category/delete-category",
	async (id, thunkAPI) => {
		try {
			return await categoryService.deleteCategory(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
const initialState = {
	category: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.category = action.payload;
			})
			.addCase(getCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(createCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.createdCategory = action.payload;
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(deleteCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.deletedCategory = action.payload;
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});
export default categorySlice.reducer;
