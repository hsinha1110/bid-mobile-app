import { combineReducers } from "redux";
 import AuthSlice from "./auth.slice";
 import AppointmentSlice from "./appointment.slice";
import  CartDetailSlice  from "./cart.slice";
export default combineReducers({
  auth: AuthSlice,
  appointments:AppointmentSlice,
  cartDetails:CartDetailSlice
   
});