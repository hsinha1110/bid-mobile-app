import axios from "axios";
import { replaceUrl } from "../../helpers";
import { METHODS, SERVICE_ROUTES } from "../constants/services.constant";

//============================NEW SERVICE_ROUTES============================//
//==================for PostService===================//
// export function registrationService(data) {
//   return new Promise((resolve, reject) => {
//     let config = {
//       url: SERVICE_ROUTES.SIGN_UP,
//       method: METHODS.POST,
//       data,
//     };

//     axios
//     .request(config)
//     .then((response) => {

//       resolve(response);
//     })
//     .catch((error) => {

//         reject(error);
//       });
//   });
// }

export const GetAppointmentsBatchById = (payload) => {
  const { params, id } = payload;
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_APPOINTMENT_BY_ID, { id: id }),
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
export const GetAppointmentsBatch = ({ params }) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_APPOINTMENT,
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

export function GetAppointmentWorkTypeService() {
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.APOINTMENT_WORK_TYPE,
      method: METHODS.GET,
    };
    console.log(config);
    axios
      .request(config)
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}
export const GetAppointmentsDocuments = ( {params} ) => {
  console.log(params, "params")
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.GET_APPOINTMENT_DOCUMENTS,
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