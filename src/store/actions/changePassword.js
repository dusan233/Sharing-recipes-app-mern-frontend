import * as actionTypes from "../actionTypes";
import { batch } from "react-redux";

const startChangingPassword = () => ({
  type: actionTypes.START_CHANGING_PASSWORD,
});

const stopChangingPassword = () => ({
  type: actionTypes.STOP_CHANGING_PASSWORD,
});

const setPasswordErrors = (errors) => ({
  type: actionTypes.SET_CHANGE_PASSWORD_ERRORS,
  errors,
});

const clearPasswordErrors = () => ({
  type: actionTypes.CLEAR_CHANGE_PASSWORD_ERRORS,
});

export const changePassword = (
  currentPassword,
  newPassword,
  confirmedNewPassword,
  userId,
  token
) => {
  return (dispatch) => {
    dispatch(startChangingPassword());
    return fetch(
      `${process.env.REACT_APP_BACKEND_URL}/change-password/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          password: currentPassword,
          newPassword,
          confirmedNewPassword,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.errorData) {
          const errors = {};
          data.errorData.forEach((err) => {
            if (!errors[err.param]) {
              errors[err.param] = err.msg;
            }
          });
          batch(() => {
            dispatch(stopChangingPassword());
            dispatch(setPasswordErrors(errors));
          });
        } else {
          batch(() => {
            dispatch(stopChangingPassword());
            dispatch(clearPasswordErrors());
          });
        }

        return data;
      })
      .catch((err) => console.log(err));
  };
};
