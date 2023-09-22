import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { THUNK_STATUS } from "../constants/redux.constants";
import _ from "lodash";
import {
  getProfileQuestions,
  getUplodedDocuments,
  getUserProfile,
  loginAsync,
  otpSentForLoginAsync,
  otpSentForRegistrationAsync,
  sendOtpAsync,
} from "../asyncThunk/auth.asyncThunk";
const initialState = {
  user: null,
  phoneNumber: "",
  otp: 0,
  tokenDetails: null,
  loginStatus: null,
  sendOtpStatus: null,
  accessToken: "",
  otpType: 2,
  role: null,
  primaryQuestions: [],
  secondaryQuestions: [],
  getUplodedDocumentStatus: null,
  uplodedDocuments: [],
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = '123123123sdfsdfwefr';
      state.user = { point: 0 };
    },
    test: (state, action)=>{
      console.log("first")
    },
    logout: (state, action) => {
      state.accessToken = null;
      state = initialState;
      AsyncStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(otpSentForLoginAsync.pending, (state, action) => {
      state.loginStatus = THUNK_STATUS.LOADING;
    });
    builder.addCase(otpSentForLoginAsync.fulfilled, (state, action) => {
      state.loginStatus = THUNK_STATUS.SUCCESS;
      console.log(action.payload)
      state.accessToken = action.payload.data.data.token.access;
      state.user = action.payload.data.data.user;
    });
    builder.addCase(otpSentForLoginAsync.rejected, (state, action) => {
      state.loginStatus = THUNK_STATUS.FAILED;
    });

    //-----------------Registration Builder-----------------//

    builder.addCase(otpSentForRegistrationAsync.pending, (state, action) => {
      state.signUpStatus = THUNK_STATUS.LOADING;
    });
    builder.addCase(otpSentForRegistrationAsync.fulfilled, (state, action) => {
      state.signUpStatus = THUNK_STATUS.SUCCESS;

      state.accessToken = action.payload.data.data.token.access;
    });
    builder.addCase(otpSentForRegistrationAsync.rejected, (state, action) => {
      state.signUpStatus = THUNK_STATUS.FAILED;
    });
    // //Get Questions
    builder.addCase(getProfileQuestions.fulfilled, (state, action) => {
      let groups = _.groupBy(action.payload.data.data.data, "group");
      if (groups.primary) {
        state.primaryQuestions = groups.primary;
      }
      if (groups.secondary) {
        state.secondaryQuestions = groups.secondary;
      }
    });
    // //Login
    builder.addCase(getProfileQuestions.pending, (state, action) => {
      state.sendOtpStatus = THUNK_STATUS.LOADING;
    });
    // builder.addCase(sendOtpAsync.fulfilled, (state, action) => {
    //   state.sendOtpStatus = THUNK_STATUS.SUCCESS;
    // });
    // builder.addCase(sendOtpAsync.rejected, (state, action) => {
    //   state.sendOtpStatus = THUNK_STATUS.FAILED;
    // });
    //Get Uploaded Documents
    builder.addCase(getUplodedDocuments.pending, (state, action) => {
      state.getUplodedDocumentStatus = THUNK_STATUS.LOADING;
      // state.uplodedDocuments = action.payload.data.data;
    });
    builder.addCase(getUplodedDocuments.fulfilled, (state, action) => {
      state.getUplodedDocumentStatus = THUNK_STATUS.SUCCESS;
      state.uplodedDocuments = action.payload.data.data;
    });
    builder.addCase(getUplodedDocuments.rejected, (state, action) => {
      state.getUplodedDocumentStatus = THUNK_STATUS.FAILED;
      // state.uplodedDocuments = action.payload.data.data;
    });
    // //update Profile Data
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.getUplodedDocumentStatus = THUNK_STATUS.SUCCESS;

      state.user = action.payload.data;
    });
  },
});

export const { setToken, logout, test } = AuthSlice.actions;

export const authState = (state) => state.authState;

export default AuthSlice.reducer;
