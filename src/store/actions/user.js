import * as actionTypes from "../actionTypes";

const startUserLoading = () => {
  return {
    type: actionTypes.START_USER_LOADING,
  };
};

const stopUserLoading = () => {
  return {
    type: actionTypes.STOP_USER_LOADING,
  };
};

const startRecCardLoading = (recId) => {
  return {
    type: actionTypes.START_RECCARD_LOADING,
    recId: recId,
  };
};

const stopRecCardLoading = () => {
  return {
    type: actionTypes.STOP_RECCARD_LOADING,
  };
};

const setUsersCreatedRec = (recipes) => {
  return {
    type: actionTypes.SET_USERS_CREATED_RECIPES,
    createdRecipes: recipes,
  };
};

const setUsersFavouriteRec = (recipes) => {
  return {
    type: actionTypes.SET_USERS_FAVOURITE_RECIPES,
    favouriteRecipes: recipes,
  };
};

const startReviewLoading = () => {
  return {
    type: actionTypes.START_REVIEW_LOADING,
  };
};

const stopReviewLoading = () => {
  return {
    type: actionTypes.STOP_REVIEW_LOADING,
  };
};

const setReviewError = (error) => {
  return {
    type: actionTypes.SET_REVIEW_ERROR,
    error: error,
  };
};

const clearReviewError = () => {
  return {
    type: actionTypes.CLEAR_REVIEW_ERROR,
  };
};

const startClosingAccount = () => {
  return {
    type: actionTypes.START_DELETING_ACCOUNT,
  };
};

const stopClosingAccount = () => ({ type: actionTypes.STOP_DELETING_ACCOUNT });

export const setRecipeReviews = (reviews) => {
  return {
    type: actionTypes.SET_RECIPE_REVIEWS,
    reviews: reviews,
  };
};

export const deleteAccount = (accId, userToken, logout) => {
  return (dispatch) => {
    dispatch(startClosingAccount());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/account/${accId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        dispatch(stopClosingAccount());
        logout();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUsersCreatedRecipes = (userToken, userId) => {
  return (dispatch) => {
    dispatch(startUserLoading());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/recipes/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(stopUserLoading());
        dispatch(setUsersCreatedRec(data.usersCreatedReceipes));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUsersFavouriteRecipes = (userToken, userId) => {
  return (dispatch) => {
    dispatch(startUserLoading());
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/favouriteRecipes/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(stopUserLoading());
        dispatch(stopRecCardLoading());
        dispatch(setUsersFavouriteRec(data.usersFavouriteReceipes));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteRecipe = (userToken, userId, recipeId) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/deleteRecipe/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        recipeId: recipeId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(getUsersFavouriteRecipes(userToken, userId));
        dispatch(getUsersCreatedRecipes(userToken, userId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addRecipeToFavourites = (userToken, userId, recipeId) => {
  return (dispatch) => {
    dispatch(startRecCardLoading(recipeId));
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/favouriteRecipes/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify({
          recipeId: recipeId,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(getUsersFavouriteRecipes(userToken, userId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addRecipeReview = (userToken, userId, recipeId, reviewData) => {
  return (dispatch) => {
    dispatch(startReviewLoading());
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/recipe/review/${userId}/${recipeId}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          rate: reviewData.rate,
          comment: reviewData.commentValue,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(stopReviewLoading());
        if (data.errorData) {
          return dispatch(setReviewError(data.errorData.msg));
        }
        dispatch(clearReviewError());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
