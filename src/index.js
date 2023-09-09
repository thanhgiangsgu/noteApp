import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast'


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
    <Toaster />
  </Provider>
  ,document.getElementById("root")
);
