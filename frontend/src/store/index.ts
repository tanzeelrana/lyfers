import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Auth"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run the saga
sagaMiddleware.run(rootSaga);
persistStore(store);

export default store;
