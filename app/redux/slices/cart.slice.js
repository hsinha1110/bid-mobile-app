import { createSlice } from "@reduxjs/toolkit";
import { THUNK_STATUS } from "../constants/redux.constants";
import _ from "lodash";
import { getCartDetailsAsync } from "../asyncThunk/cart.asyncThunk";

const initialState = {
  cartDetials: [],
  productIds:[],
  approved_count : 0,
  status: {},
};

export const CartDetailSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers: (builder) => {
    //======================CART DETAIALS =================//
    builder.addCase(getCartDetailsAsync.pending, (state, action) => {
      state.status.cartStatus = THUNK_STATUS.LOADING;
    });
    builder.addCase(getCartDetailsAsync.fulfilled, (state, action) => {
      state.status.cartStatus = THUNK_STATUS.SUCCESS;

      state.cartDetials = action.payload.data.products;
      state.card_id = action.payload.data.id;
      state.productIds=action.payload.data.products.map(item=>item.id)
      state.approved_count = action.payload.data.approved_bids_count
      // state.cartDetials_limits = action.payload.data.data.limit;
      // state.cartDetials_next = action.payload.data.data.next;
    });
    builder.addCase(getCartDetailsAsync.rejected, (state, action) => {
      state.status.cartStatus = THUNK_STATUS.FAILED;
    });
  },
});

export const cartDetails = (state) => state.cartDetails;

export default CartDetailSlice.reducer;
