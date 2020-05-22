import React from "react";

import { connect } from "react-redux";
import * as action from "../../store/index";

import Spinner from "../../components/Spinner/Spinner";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Modal from "../../components/Modal/Modal";
import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { Redirect } from "react-router";

class UserRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      deleteRecipeId: null,
    };
    this.FavouritesSection = React.createRef();
  }

  closeModal = () => {
    this.setState({ modalActive: false, deleteRecipeId: null });
  };

  openModal = (recipeId) => {
    this.setState({ modalActive: true, deleteRecipeId: recipeId });
  };

  shouldYouCloseModal = (e) => {
    if (e.target.classList.contains("delete_recipe_modal")) {
      this.closeModal();
    }
  };

  componentDidMount() {
    this.props.getUsersCreated(this.props.userToken, this.props.userId);
    this.props.getUsersFavourites(this.props.userToken, this.props.userId);
    window.addEventListener("mousedown", this.shouldYouCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.shouldYouCloseModal);
  }

  render() {
    const {
      loading,
      createdRecipes,
      userToken,
      userId,
      favouriteRecipes,
    } = this.props;

    const { modalActive } = this.state;

    if (!userToken) {
      return <Redirect to="/login" />;
    }

    let modalContClasses = modalActive
      ? "delete_recipe_modal_card open_modal"
      : "delete_recipe_modal_card close_modal_real";

    let modalClasses = modalActive
      ? "delete_recipe_modal"
      : "delete_recipe_modal_close";

    let createdRecipess;
    let favouriteRecipess;
    if (loading) {
      createdRecipess = <Spinner big color="red" />;
      favouriteRecipess = <Spinner big color="red" />;
    } else {
      createdRecipess = (
        <div className="recipes_container">
          {createdRecipes ? (
            createdRecipes.length > 0 ? (
              createdRecipes.map((recipe) => {
                return (
                  <RecipeCard
                    created
                    key={recipe._id}
                    reviews={recipe.reviews}
                    recId={recipe._id}
                    imgUrl={`${process.env.REACT_APP_BACKEND_URL}/${recipe.recipeImages[0]}`}
                    title={recipe.title}
                    cookingTime={recipe.cookingTime}
                    creator={recipe.creator}
                    favRecipes={favouriteRecipes}
                    openDelRecModal={() => {
                      this.openModal(recipe._id);
                    }}
                    addToFav={() => {
                      this.props.addRecipeToFavourites(
                        userToken,
                        userId,
                        recipe._id
                      );
                    }}
                  />
                );
              })
            ) : (
              <h3>You didnt create any recipe.</h3>
            )
          ) : null}
        </div>
      );

      favouriteRecipess = (
        <div className="recipes_container">
          {favouriteRecipes ? (
            favouriteRecipes.length > 0 ? (
              favouriteRecipes.map((recipe) => {
                return (
                  <RecipeCard
                    key={recipe._id}
                    reviews={recipe.reviews}
                    recId={recipe._id}
                    imgUrl={`${process.env.REACT_APP_BACKEND_URL}/${recipe.recipeImages[0]}`}
                    title={recipe.title}
                    cookingTime={recipe.cookingTime}
                    creator={recipe.creator}
                    favRecipes={favouriteRecipes}
                    addToFav={() => {
                      this.props.addRecipeToFavourites(
                        userToken,
                        userId,
                        recipe._id
                      );
                    }}
                  />
                );
              })
            ) : (
              <h3>You dont have favourite recipes yet.</h3>
            )
          ) : null}
        </div>
      );
    }

    return (
      <div className="content_wrap">
        <div className="wrap_heading_one">
          <h1 className="heading_one">Created Recipes</h1>
        </div>
        {createdRecipess}
        <div ref={this.FavouritesSection} className="wrap_heading_one">
          <h1 className="heading_one">Favourite Recipes</h1>
        </div>
        {favouriteRecipess}

        <Modal>
          <div className={modalClasses}>
            <div className={modalContClasses}>
              <div className="close_icon_cont">
                <IconContext.Provider value={{ className: "close_modal" }}>
                  <IoMdClose onClick={this.closeModal} />
                </IconContext.Provider>
              </div>
              <h2 className="delete_recipe_modal_note">
                This Recipe will be permanently deleted
              </h2>
              <h3 className="delete_recipe_modal_note2">
                Are you sure you want to continue?
              </h3>
              <button
                onClick={() => {
                  this.props.deleteRecipe(
                    userToken,
                    userId,
                    this.state.deleteRecipeId
                  );
                  this.closeModal();
                }}
                className="delete_recipe_permanent"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    userToken: state.auth.token,
    userId: state.auth.userId,
    createdRecipes: state.user.createdRecipes,
    favouriteRecipes: state.user.favouriteRecipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersCreated: (userToken, userId) =>
      dispatch(action.getUsersCreatedRecipes(userToken, userId)),
    getUsersFavourites: (userToken, userId) =>
      dispatch(action.getUsersFavouriteRecipes(userToken, userId)),
    addRecipeToFavourites: (userToken, userId, recipeId) =>
      dispatch(action.addRecipeToFavourites(userToken, userId, recipeId)),
    deleteRecipe: (userToken, userId, recipeId) =>
      dispatch(action.deleteRecipe(userToken, userId, recipeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipes);
