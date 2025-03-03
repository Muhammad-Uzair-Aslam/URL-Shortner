// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // Auth reducer ko add kiya
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];