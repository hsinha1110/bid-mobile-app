import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import rootReducers from "../slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "@redux-devtools/extension";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whiteList: ["auth"],
  blackList: ["appointments"],
};

export const persistedReducer = persistReducer(
  persistConfig,
  rootReducers,
  composeWithDevTools(applyMiddleware())
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk,
    }),
});

export const persistor = persistStore(store);
