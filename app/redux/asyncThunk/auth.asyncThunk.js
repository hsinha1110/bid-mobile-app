import { createAsyncThunk } from "@reduxjs/toolkit";
import { ASYNC_ROUTES } from "../constants/redux.constants";
import {
  GetAppointmentUploadedDocuments,
  GetProfileQuestions,
  GetUplodedDocuments,
  GetUserProfile,
  loginService,
  registrationService,
  sendOtpForLoginService,
  sendOtpForRegistrationService,
  sendOtpService,
  UpdateUserProfile,
  UploadAppointmentDocument,
  UploadProfileQuestionsDocument,
} from "../services";

export const registrationAsync = createAsyncThunk(
  ASYNC_ROUTES.SIGN_UP,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await registrationService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const otpSentForRegistrationAsync = createAsyncThunk(
  ASYNC_ROUTES.SIGN_UP_OTP,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await sendOtpForRegistrationService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginAsync = createAsyncThunk(
  ASYNC_ROUTES.LOGIN,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const otpSentForLoginAsync = createAsyncThunk(
  ASYNC_ROUTES.LOGIN_OTP_VERIFY,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await sendOtpForLoginService(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateProfile = createAsyncThunk(
  ASYNC_ROUTES.UPDATE_USER_PROFILE_DETAILS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await UpdateUserProfile(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
// export const getUserProfileDetailsAsync = createAsyncThunk(
//   ASYNC_ROUTES.GET_USER_PROFILE_DETAILS,
//   async ({ params, companyId }, { rejectWithValue }) => {
//     try {
//       const response = await GetProfileQuestions(params, companyId);
//       return response;
//     } catch (err) {
//       console.log("err", err);
//       return rejectWithValue(err);
//     }
//   }
// );

export const getProfileQuestions = createAsyncThunk(
  ASYNC_ROUTES.GET_PROFILE_QUESTIONS,
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await GetProfileQuestions(params);
      return response;
    } catch (err) {
      console.log("err", err);
      return rejectWithValue(err);
    }
  }
);
export const uploadProfileQuestionsDocument = createAsyncThunk(
  ASYNC_ROUTES.UPLOAD_QUESTION_DOCUMENTS,
  async ({ data }, { rejectWithValue }) => {
    try {
      
      const response = await UploadProfileQuestionsDocument(data);
      console.log(response, "1231231231231231");
      return response;
    } catch (err) {
      console.log("err", err);
      return rejectWithValue(err);
    }
  }
);
//----------------------------Old Thunks ---------------------//


// export const uploadAppointmentQuestionsDocument = createAsyncThunk(
//   ASYNC_ROUTES.UPLOAD_APPOINTMENT_DOCUMENTS,
//   async ({ data, companyId }, { rejectWithValue }) => {
//     try {
//       const response = await UploadAppointmentDocument(data, companyId);
//       console.log(response, "1231231231231231");
//       return response;
//     } catch (err) {
//       console.log("err", err);
//       return rejectWithValue(err);
//     }
//   }
// );
export const getUplodedDocuments = createAsyncThunk(
  ASYNC_ROUTES.GET_UPLOADED_DOCUMENTS,
  async ({ params}, { rejectWithValue }) => {
    try {
      const response = await GetUplodedDocuments(params);
      console.log(response);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  ASYNC_ROUTES.GET_USER_PROFILE,
  async (payload, { rejectWithValue }) => {
  
    try {
      const response = await GetUserProfile(payload.id);

      console.log("updated user profile", response);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// export const getAppointmentUploadedDocuments = createAsyncThunk(
//   ASYNC_ROUTES.GET_APPOINTMENT_UPLOADED_DOCUMENTS,
//   async ({ appointment, companyId }, { rejectWithValue }) => {
//     try {
//       const response = await GetAppointmentUploadedDocuments(
//         { appointment },
//         companyId
//       );
//       return response;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );
