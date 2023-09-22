import axios from "axios";
import { replaceUrl } from "../../helpers";
import { METHODS, SERVICE_ROUTES } from "../constants/services.constant";

export const GetCartService = (payload) => {
  const { id, params } = payload;

  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.GET_CART, { id: id }),
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

export const UpdateCartService = (payload) => {
  const {id,data} = payload
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.UPDATE_CART, { id: id }),
      method: METHODS.PATCH,
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
};

export const DeleteCartService = ({ id, data, params }) => {
  // const {data,params} = data
  return new Promise((resolve, reject) => {
    let config = {
      url: replaceUrl(SERVICE_ROUTES.DELETE_CART, { id: id }),
      method: METHODS.DELETE,
      
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

export const PostABidService = (payload) => {
  const data = payload
  return new Promise((resolve, reject) => {
    let config = {
      url: SERVICE_ROUTES.MAKE_BID,
      method: METHODS.POST,
      
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
