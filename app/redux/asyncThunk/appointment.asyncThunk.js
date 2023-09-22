import { createAsyncThunk } from "@reduxjs/toolkit";
import { G } from "react-native-svg";
import { ASYNC_ROUTES } from "../constants/redux.constants";
import { GetAppointmentsBatch, GetAppointmentsBatchById, GetAppointmentsDocuments, GetAppointmentWorkTypeService } from "../services";

export const getAppointmentsAsync = createAsyncThunk(
	ASYNC_ROUTES.GET_APPOINTMENT,
	async (payload, { rejectWithValue }) => {
		try {
			const response = await GetAppointmentsBatch(payload);
			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	},
);

export const getAppointmentsByIdAsync = createAsyncThunk(
	ASYNC_ROUTES.GET_APPOINTMENT_BY_ID,
	async (payload, { rejectWithValue }) => {
		
		try {
			const response = await GetAppointmentsBatchById(payload);
			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	},
);

export const getAppointmentWorkType = createAsyncThunk(
	ASYNC_ROUTES.APOINTMENT_WORK_TYPE,
	async (payload, { rejectWithValue }) => {
		try {
			const response = await GetAppointmentWorkTypeService();
			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	},
);
export const getAppointmentDocuments = createAsyncThunk(
	ASYNC_ROUTES.GET_APPOINTMENT_DOCUMENTS,
	async (payload, { rejectWithValue }) => {
		try {
			const response = await GetAppointmentsDocuments(payload);
			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	},
);
