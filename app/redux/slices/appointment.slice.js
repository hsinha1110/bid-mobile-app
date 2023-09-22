import { createSlice } from "@reduxjs/toolkit";
import { THUNK_STATUS } from "../constants/redux.constants";
import _ from "lodash";

import {
	getAppointmentDocuments,
	getAppointmentsAsync,
	getAppointmentsByIdAsync,
	getAppointmentWorkType,
} from "../asyncThunk/appointment.asyncThunk";
const initialState = {
	batch_appointments: [],
	batch_appointments_limits: null,
	batch_appointments_next: null,
	my_appointments: [],
	status: {},
	workType: [],
	appt_featured: [],
};

export const AppointmentSlice = createSlice({
	name: "appointments",
	initialState,
	reducers: {
		updateCurrentBatch: (state, action) => {
			state.appt_featured = { ...state.appt_featured, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAppointmentsAsync.pending, (state, action) => {
			state.appointmentStatus = THUNK_STATUS.LOADING;
		});
		builder.addCase(getAppointmentsAsync.fulfilled, (state, action) => {
			state.appointmentStatus = THUNK_STATUS.SUCCESS;

			state.batch_appointments = action.payload.data.data.data;
			state.batch_appointments_limits = action.payload.data.data.limit;
			state.batch_appointments_next = action.payload.data.data.next;
		});
		builder.addCase(getAppointmentsAsync.rejected, (state, action) => {
			state.appointmentStatus = THUNK_STATUS.FAILED;
		});

		builder.addCase(getAppointmentWorkType.fulfilled, (state, action) => {
			state.workType = action.payload.data.data.data;
		});
		builder.addCase(getAppointmentWorkType.rejected, (state, action) => {});

		builder.addCase(getAppointmentsByIdAsync.pending, (state, action) => {
			state.status.appt_featuredStatus = THUNK_STATUS.LOADING;
		});
		builder.addCase(getAppointmentsByIdAsync.fulfilled, (state, action) => {
			state.status.appt_featuredStatus = THUNK_STATUS.SUCCESS;

			state.appt_featured = action.payload.data;
		});
		builder.addCase(getAppointmentsByIdAsync.rejected, (state, action) => {
			state.status.appt_featuredStatus = THUNK_STATUS.FAILED;
		});
		builder.addCase(getAppointmentDocuments.fulfilled, (state, action) => {
			state.status.documents = THUNK_STATUS.SUCCESS;
		});
	},
});

export const { updateCurrentBatch } = AppointmentSlice.actions;

export const appointments = (state) => state.appointments;

export default AppointmentSlice.reducer;
