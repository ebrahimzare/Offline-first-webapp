import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import "./css/index.css";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// import storage from 'redux-persist/lib/storage'; localStorage
import storageSession from "redux-persist/lib/storage/session";

import rootReducer from "./redux/reducers"; // index.js of reducers folder
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const persistConfig = {
  key: "root",
  storage: storageSession
};

const middleware = [thunk];
if (process.env.NODE_ENV.trim() !== "production") {
  middleware.push(createLogger());
}

//  to save the Redux Store when the app is closed or refreshed in Expo. we need
//Redux-Persist : Persists Redux Global Store
// redux-thunk : Async/Await
//redux-logger : Logs Redux State for when developing
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

store.subscribe(() => console.log("store.getState()", store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
