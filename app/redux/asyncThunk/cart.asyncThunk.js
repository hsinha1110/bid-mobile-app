import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../constants/redux.constants";
import { DeleteCartService, GetCartService, PostABidService, UpdateCartService } from "../services/cart.services";

export const getCartDetailsAsync = createAsyncThunk(
  ASYNC_ROUTES.GET_CART_DETAILS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await GetCartService(payload);

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateCartDetailsAsync = createAsyncThunk(
  ASYNC_ROUTES.UPDATE_CART_DETAILS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UpdateCartService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteCartDetailsAsync = createAsyncThunk(
  ASYNC_ROUTES.DELETE_CART_DETAILS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await DeleteCartService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const postABidAsync = createAsyncThunk(
	ASYNC_ROUTES.GET_APPOINTMENT_BY_ID,
	async (payload, { rejectWithValue }) => {
		
		try {
			const response = await PostABidService(payload);
			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	},
);