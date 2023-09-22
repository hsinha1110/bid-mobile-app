import axios from "axios";
import { replaceUrl } from "../../helpers";
import { METHODS, SERVICE_ROUTES } from "../constants/services.constant";

//============================NEW SERVICE_ROUTES============================//

export function registrationService(data) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.SIGN_UP,
      method: METHODS.POST,
      data,
    };

    axios
      .request(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function loginService(data) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.LOGIN,
      method: METHODS.POST,
      data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log("first", response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function sendOtpForRegistrationService(data) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.REGISTRATION_OTP,
      method: METHODS.POST,
      data,
    };
    axios
      .request(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function sendOtpForLoginService(data) {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.LOGIN_OTP,
      method: METHODS.POST,
      data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response, "77777777777777777777777");
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export const GetProfileQuestions = (params) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_PROFILE_QUESTIONS,
      method: METHODS.GET,
      params,
    };

    axios
      .request(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const GetUserProfile = (id) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_USER_PROFILE, { id: id }),
      method: METHODS.GET,
    };
    axios
      .request(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const UpdateUserProfile = (payload) => {
  const {id,data} = payload
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.UPDATE_USER_PROFILE, { id: id }),
      method: METHODS.PATCH,
      data
    };
    axios
      .request(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const GetUplodedDocuments = (params) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_UPLOADED_DOCUMENTS,
      method: METHODS.GET,
      params,
    };
    axios
      .request(config)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const UploadProfileQuestionsDocument = (data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.UPLOAD_QUESTION_DOCUMENTS,
      method: METHODS.POST,
      headers: { "Content-Type": "multipart/form-data" },
      data,
    };
   
    axios
      .request(config)
      .then((response) => {
        console.log("first.........................", response);
        resolve(response);
      })
      .catch((error) => {
        console.log("second.........................", error);
        reject(error);
      });
   
  });
};

///// -----------------------------Old methods -----------------------------///

// export function loginService(data) {
//   return new Promise((resolve, reject) => {
//     let config = {
//       url: SERVICE_ROUTES.OTP_VERIFY,
//       method: METHODS.POST,
//       data,
//     };
//     axios
//       .request(config)
//       .then(response => {
//         console.log('first', response);
//         resolve(response);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }
// export function sendOtpService(data) {
//   return new Promise((resolve, reject) => {
//     let config = {
//       url: SERVICE_ROUTES.AUTH_OTP_LOGIN,
//       method: METHODS.POST,
//       data,
//     };
//     axios
//       .request(config)
//       .then(response => {
//         resolve(response);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }

// export const UploadAppointmentDocument = (data, companyId) => {
//   return new Promise((resolve, reject) => {
//     let config = {
//       url: replaceUrl(SERVICE_ROUTES.UPLOAD_APPOINTMENT_DOCUMENTS, {companyId}),
//       method: METHODS.POST,
//       headers: {'Content-Type': 'multipart/form-data'},
//       data,
//     };
//     setTimeout(() => {
//       axios
//       .request(config)
//       .then(response => {
//          console.log('first.........................', response);
//         resolve(response);
//       })
//       .catch(error => {
//         console.log('second.........................', error);

//         reject(error);
//       });
//     }, 5000);
//   });
// };

// export const GetAppointmentUploadedDocuments = (params, companyId) => {
//   return new Promise((resolve, reject) => {
//     let config = {
//       url: replaceUrl(SERVICE_ROUTES.GET_APPOINTMENT_UPLOADED_DOCUMENTS, {companyId}),
//       method: METHODS.GET,
//       params
//     };
//     axios
//       .request(config)
//       .then(response => {
//         resolve(response);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };
