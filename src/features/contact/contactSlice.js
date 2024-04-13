import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

export const getContacts = createAsyncThunk(
	"contact/get-contacts",
	async (thunkAPI) => {
		try {
			return await contactService.getContacts();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const deleteContact = createAsyncThunk(
	"contact/delete-contacts",
	async (id, thunkAPI) => {
		try {
			return await contactService.deleteContact(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const initialState = {
	contacts: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const contactSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getContacts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getContacts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.contacts = action.payload;
			})
			.addCase(getContacts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(deleteContact.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.deletedContact = action.payload;
			})
			.addCase(deleteContact.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});
export default contactSlice.reducer;
