export const ASYNC_ROUTES = {
  //-------------------------------Auth Related--------------------------------//
  SIGN_UP: "/auth-registration",
  SIGN_UP_OTP: "/auth-registration-otp",

  LOGIN: "/auth-otp-login",
  LOGIN_OTP_VERIFY: "/auth-otp-verify",
  
  GET_USER_PROFILE_DETAILS: "/get-user-profile-details",
  UPDATE_USER_PROFILE_DETAILS: "/update-user-profile-details",

  GET_PROFILE_QUESTIONS: "/get-profile-questions",
  GET_APPOINTMENT: "/get-appointment",
  GET_APPOINTMENT_BY_ID: "/get-appointment-by-id",


  GET_CART_DETAILS: "/get-cart-details",
  DELETE_CART_DETAILS: "/delete-cart-details",
  UPDATE_CART_DETAILS: "/update-cart-details",
  MAKE_BID:"/make-bid",

  //-------------------Old-----------------//
  UPLOAD_QUESTION_DOCUMENTS: "/upload-question-documents",
  UPLOAD_APPOINTMENT_DOCUMENTS: "/upload-appointment-documents",
  GET_APPOINTMENT_DOCUMENTS:"/get-appt-documents",
  GET_UPLOADED_DOCUMENTS: "/get-uploded-documents",
  GET_APPOINTMENT_UPLOADED_DOCUMENTS: "/get-appointment-uploaded-documents",
  GET_USER_PROFILE: "/get-user-profile",
  //-------------- Appointment Related Api ----------->>.
  GET_APPOINTMENT_BY_ID: "get-appointmentById",
  CREATE_APPOINTMENT: "create-appointment",
  GET_APPOINTMENT_QUESTIONS: "get-appointment-questions",
  GET_APPOINTMENT_BY_CUSTOMER: "customer/get-appointment",
  GET_APPOINTMENT_BY_ID_BY_CUSTOMER: "customer/get-appointmentById",
  CREATE_APPOINTMENT_BY_CUSTOMER: "customer/create-appointment",
  UPDATE_APPOINTMENT: "update-appointment",
  DELETE_APPOINTMENT: "delete-appointment",
  APOINTMENT_WORK_TYPE: "appointment-workType",
  APPOINTMENT_STATUS_LIST: "appointment-status-list",
  CREATE_JOB: "create-job",
  CREATE_JOB_BY_CUSTOMER: "customer/create-job",
  GET_CUSTOMERS: "customers/get-all",
};

export const THUNK_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
};
