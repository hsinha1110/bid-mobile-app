export const SERVICE_ROUTES = {
  //------------auth---------------//
  SIGN_UP: "service-worker/sign-up/",
  REGISTRATION_OTP: "service-worker/sign-up/verify-otp/",

  LOGIN: "service-worker/otp/login/",
  LOGIN_OTP: "service-worker/otp/verify/",

  GET_USER_PROFILE: "service-worker/:id/",
  UPDATE_USER_PROFILE: "service-worker/:id/",
  GET_PROFILE_QUESTIONS: "service-worker/questions/",

  GET_UPLOADED_DOCUMENTS: "service-worker/documents/",
  UPLOAD_QUESTION_DOCUMENTS: "service-worker/documents/",
  GET_APPOINTMENT_DOCUMENTS:"service-worker/appointment-documents/",
  GET_APPOINTMENT: "service-worker/appointment-batch/",
  GET_APPOINTMENT_BY_ID: "service-worker/appointment-batch/:id/",
  APOINTMENT_WORK_TYPE: "service-worker/work-type/",
  GET_CART: "service-worker/cart/:id/",
  UPDATE_CART: "service-worker/cart/:id/",
  DELETE_CART: "service-worker/cart/:id/",
  MAKE_BID:"/service-worker/make-bid/"
};

export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};
