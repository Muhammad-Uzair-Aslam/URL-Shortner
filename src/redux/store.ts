// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import profileReducer from './slices/profileSlice';
import urlReducer from './slices/urlSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, 
      profile:profileReducer,
      urls:urlReducer
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];