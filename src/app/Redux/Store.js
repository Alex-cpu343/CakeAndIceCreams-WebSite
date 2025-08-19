import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import productReducer from "./Reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // зберігати тільки кошик
};

const persistedReducer = persistReducer(persistConfig, productReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
