import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";
import authReducer from "./auth/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // only persist the token
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filtersReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});
export const persistor = persistStore(store);
