import * as actionTypes from "../actionTypes";
const startAuthLoading = () => {
  return {
    type: actionTypes.START_AUTH_LOADING,
  };
};

const stopAuthLoading = () => {
  return {
    type: actionTypes.STOP_AUTH_LOADING,
  };
};

const setSignupErrors = (errorsData) => {
  return {
    type: actionTypes.SET_SIGNUP_ERRORS,
    errors: errorsData,
  };
};

const setLoginErrors = (errorData) => {
  return {
    type: actionTypes.SET_LOGIN_ERRORS,
    errors: errorData,
  };
};

const clearSignupErrors = () => {
  return {
    type: actionTypes.CLEAR_SIGNUP_ERRORS,
  };
};

export const clearAuthEverything = () => {
  return {
    type: actionTypes.CLEAR_AUTH_EVERYTHING,
  };
};

export const SignUp = (username, email, password) => {
  return (dispatch) => {
    dispatch(startAuthLoading());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(stopAuthLoading());
        if (data.errorData) {
          return dispatch(setSignupErrors(data.errorData[0]));
        }
        dispatch(clearSignupErrors());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const Logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("expires");
  localStorage.removeItem("username");
  return {
    type: actionTypes.CLEAR_USER_TOKEN,
  };
};

const storeUserToken = (token, userId, username) => {
  let clearTime = new Date().getTime() + 60 * 30;

  localStorage.setItem("userToken", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("username", username);
  localStorage.setItem("expires", new Date(clearTime).toISOString());

  return {
    type: actionTypes.STORE_USER_TOKEN,
    token: token,
    userId: userId,
  };
};

export const getTokenFromStorage = () => {
  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  return {
    type: actionTypes.STORE_USER_TOKEN,
    token: token,
    userId: userId,
  };
};

export const LogIn = (email, password, storeUserData) => {
  return (dispatch) => {
    dispatch(startAuthLoading());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(stopAuthLoading());
        if (data.errorData) {
          return dispatch(setLoginErrors(data.errorData[0]));
        }
        dispatch(storeUserData(data.username, data.headline));
        dispatch(storeUserToken(data.token, data.userId, data.username));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
