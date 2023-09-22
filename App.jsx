import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, store } from "./app/redux/store";
import Toast from "react-native-toast-message";
console.disableYellowBox = true;
import { Provider as PaperProvider } from "react-native-paper";
import AppStack from "./app/navigators/AppStack";
import PointCheckListStack from "./app/navigators/PointCheckListStack";
import AuthStack from "./app/navigators/AuthStack";
import SplashScreen from "react-native-splash-screen";
import { LogBox } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { test } from "./app/redux/slices/auth.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

AwesomeIcon.loadFont();
LogBox.ignoreAllLogs(true);

Axios.interceptors.response.use(
  (res) => {
    console.log(res, "response.............");
    return res;
  },
  (err) => {
    if (err.response && err.response.status === 401 || 500 || 403) {
      console.log(err, "err.............");
      //   persistor.purge()
      AsyncStorage.removeItem("persist:root");
      return Promise.reject(err.response);
    }

    return Promise.reject(err.response);
  }
);
const RoutesComponent = () => {
  const { accessToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  dispatch(test());
  if (accessToken) {
    Axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    if (user && user.points < 100) {
      return <PointCheckListStack />;
    }
    return <AppStack />;
  } else {
    return <AuthStack />;
  }
};

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  Axios.defaults.baseURL = "https://api.buildblog.in/api/v1/";

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider
          settings={{
            icon: (props) => (
              <>
                <AwesomeIcon {...props} />
              </>
            ),
          }}
        >
          <RoutesComponent />
          <Toast />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
