import React from "react";
import { useReducer } from "react";

import { connect } from "react-redux";
import * as actionCreator from "../../store/index";

const reducer = (state, action) => {
  switch (action.type) {
    case "username":
      return {
        ...state,
        username: action.username,
      };
    case "headline":
      return {
        ...state,
        headline: action.headline,
      };
    default:
      return state;
  }
};

const UprateProfile = ({
  username,
  userId,
  token,
  updating,
  updateProfile,
  valError,
  storeUserData,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    username: username,
    headline: "",
  });

  const updateUserProfile = () => {
    updateProfile(userId, token, state.username, state.headline, storeUserData);
  };

  const onChangeInput = (e) => {
    dispatch({
      type: e.target.name,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="user-tabpanel">
      <div className="user-tabpanel-heading">
        <h2>Public Profile</h2>
        <p>Add information about yourself</p>
      </div>
      <div className="wrap_form_control">
        <div
          className="empty_ingredient_error"
          style={{
            display: valError ? "block" : "none",
          }}
        >
          {valError}
        </div>
        <div className="recipe_form_control">
          <input
            onChange={onChangeInput}
            className="recipe_form_input"
            name="username"
            id="username"
            type="text"
            value={state.username}
            placeholder="Username"
          />
        </div>

        <div className="recipe_form_control">
          <textarea
            onChange={onChangeInput}
            className="recipe_form_input"
            name="headline"
            id="headline"
            type="text"
            rows="7"
            value={state.headline}
            placeholder="Headline"
          ></textarea>
        </div>
      </div>
      <button
        onClick={updateUserProfile}
        disabled={updating}
        className="clasic-btn"
      >
        {updating ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  updating: state.updateProfile.updatingProfile,
  valError: state.updateProfile.updateProfileErrors,
});

export default connect(mapStateToProps, {
  updateProfile: actionCreator.updateProfile,
  storeUserData: actionCreator.setUserData,
})(UprateProfile);
