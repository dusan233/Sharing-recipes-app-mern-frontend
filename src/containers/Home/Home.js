import React from "react";

import peopleCooking from "../../assets/cooking_kit8-net.png";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

import { connect } from "react-redux";
import * as action from "../../store/index";

import categoryData from "../../containers/Home/categorySectionData";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getLatest();
    if (this.props.isAuth) {
      this.props.getUsersFavourites(this.props.isAuth, this.props.userId);
    }
  }

  render() {
    const {
      isAuth,
      latestRecipes,
      favouriteRecipes,
      userId,
      recCardLoading,
      currentRecLoading,
    } = this.props;

    return (
      <React.Fragment>
        <div className="introduction">
          <div className="wrap">
            <div className="introduction_text">
              <h1 className="introduction_head ">
                Cooking at home will be your next favourite thing.
              </h1>
              {isAuth ? (
                <Link
                  className="introduction_register "
                  to={{
                    pathname: "/recipes",
                  }}
                >
                  Explore Recipes
                </Link>
              ) : (
                <Link
                  className="introduction_register "
                  to={{
                    pathname: "/signup",
                  }}
                >
                  Register now
                </Link>
              )}
            </div>
          </div>
          <div className="introduction_img">
            <img src={peopleCooking} alt="" />
          </div>
        </div>
        <div className="home_latest_recipes_cont">
          <h1 className="heading_red">Latest released</h1>
          <div className="home_latest_recipes">
            {latestRecipes ? (
              latestRecipes.map((recipe) => {
                return (
                  <RecipeCard
                    new
                    key={recipe._id}
                    reviews={recipe.reviews}
                    recId={recipe._id}
                    imgUrl={`${process.env.REACT_APP_BACKEND_URL}/${recipe.recipeImages[0]}`}
                    title={recipe.title}
                    cookingTime={recipe.cookingTime}
                    creator={recipe.creator}
                    loading={recCardLoading}
                    currentRec={currentRecLoading}
                    favRecipes={
                      favouriteRecipes && isAuth ? favouriteRecipes : []
                    }
                    addToFav={() => {
                      if (isAuth) {
                        this.props.addRecipeToFavourites(
                          isAuth,
                          userId,
                          recipe._id
                        );
                      } else {
                        this.props.history.push("/login");
                      }
                    }}
                  />
                );
              })
            ) : (
              <Spinner />
            )}
          </div>

          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/recipes",
              state: {
                fromDifferentPage: true,
              },
            }}
          >
            <button className="btn_two">See all</button>
          </Link>
        </div>
        <h1 className="heading_red">Popular Categories</h1>
        <div className="recipe_category_section">
          {categoryData.map((item) => {
            return (
              <Link
                key={item.text}
                className="recipe_category_section_link"
                to={{
                  pathname: item.path,
                  search: item.query,
                }}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
        {this.props.children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token,
    latestRecipes: state.addRecipe.latestRecipes,
    loading: state.addRecipe.loading,
    userId: state.auth.userId,
    favouriteRecipes: state.user.favouriteRecipes,
    recCardLoading: state.user.recCardLoading,
    currentRecLoading: state.user.currentLoadingRec,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLatest: () => dispatch(action.getLatestRecipes()),
    getUsersFavourites: (userToken, userId) =>
      dispatch(action.getUsersFavouriteRecipes(userToken, userId)),
    addRecipeToFavourites: (userToken, userId, recipeId) =>
      dispatch(action.addRecipeToFavourites(userToken, userId, recipeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
