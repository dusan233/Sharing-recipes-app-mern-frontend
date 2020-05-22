import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import ScrollToTop from "./containers/ScrollToTop/ScrollToTop";

import authReducer from "./store/reducers/auth";
import addRecipeReducer from "./store/reducers/addRecipe";
import userReducer from "./store/reducers/user";
import profileUpdateReducer from "./store/reducers/updateProfile";
import userDataReducer from "./store/reducers/userData";
import changePasswordReducer from "./store/reducers/changePassword";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  addRecipe: addRecipeReducer,
  user: userReducer,
  updateProfile: profileUpdateReducer,
  userData: userDataReducer,
  changePassword: changePasswordReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
