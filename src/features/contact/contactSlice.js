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
export const getContact = createAsyncThunk(
	"contact/get-contact",
	async (id, thunkAPI) => {
		try {
			return await contactService.getContact(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
export const updateContact = createAsyncThunk(
	"contact/update-contact",
	async (enq, thunkAPI) => {
		try {
			return await contactService.updateContact(enq);
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
			.addCase(getContact.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.enquiryName = action.payload.name;
				state.enquiryMobile = action.payload.mobile;
				state.enquiryEmail = action.payload.email;
				state.enquiryComment = action.payload.comment;
				state.enquiryStatus = action.payload.status;
			})
			.addCase(getContact.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(updateContact.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.updatedEnquiry = action.payload;
			})
			.addCase(updateContact.rejected, (state, action) => {
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
