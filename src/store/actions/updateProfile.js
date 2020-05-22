import * as actionTypes from "../actionTypes";
import { batch } from "react-redux";

const startUpdateProfile = () => ({ type: actionTypes.START_PROFILE_UPDATE });

const finishUpdateProfile = () => ({ type: actionTypes.STOP_PROFILE_UPDATE });

const setUpdateProfileErrors = (errorMsg) => ({
  type: actionTypes.SET_UPDATE_PROFILE_ERRORS,
  errors: errorMsg,
});

const clearUpdateProfileErrors = () => ({
  type: actionTypes.CLEAR_UPDATE_PROFILE_ERRORS,
});

export const updateProfile = (
  userId,
  token,
  username,
  headline,
  storeUserData
) => {
  return (dispatch) => {
    dispatch(startUpdateProfile());
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/update-profile/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          username,
          headline,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errorData) {
          batch(() => {
            dispatch(finishUpdateProfile());
            dispatch(setUpdateProfileErrors(data.errorData[0].msg));
          });
        } else {
          batch(() => {
            dispatch(finishUpdateProfile());
            dispatch(clearUpdateProfileErrors());
            dispatch(storeUserData(data.username, data.headline));
          });
        }
      })
      .catch((err) => console.log(err));
  };
};
