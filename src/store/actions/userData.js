import * as actionTypes from "../actionTypes";
export const setUserData = (username, headline) => {
  localStorage.setItem("username", username);
  localStorage.setItem("headline", headline);
  return {
    type: actionTypes.SET_USER_DATA,
    username,
    headline,
  };
};

export const getUserDataFromStorage = () => {
  const username = localStorage.getItem("username");
  const headline = localStorage.getItem("headline");

  return {
    type: actionTypes.SET_USER_DATA,
    username,
    headline,
  };
};
