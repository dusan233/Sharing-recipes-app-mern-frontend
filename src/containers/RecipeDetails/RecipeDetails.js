import React from "react";

import { connect } from "react-redux";
import * as action from "../../store/index";
import openSocket from "socket.io-client";
import jsPDF from "jspdf";

import RecipeDetailsHeader from "../../components/RecipeDetailshHeader/RecipeDetailsHeading";
import RecipeDetailsGallery from "../../components/RecipeDetailsGallery/RecipeDetailsGallery";
import RecipeDetailsLinks from "../../components/RecipeDetailsLinks/RecipeDetailsLinks";
import AddRecipeReviev from "../../containers/AddRecipeReview/AddRecipeReview";
import RecipeReviews from "../../components/RecipeReviews/RecipeReviews";
import Spinner from "../../components/Spinner/Spinner";
import SubscribeEmail from "../../components/SubscribeEmail/SubscribeEmail";
import BestRatedCard from "../../components/BestRatedCard/BestRatedCard";
import { Link } from "react-router-dom";

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getRecipeDetails(
      this.props.match.params.recipeId,
      this.props.userId
    );
    this.props.getBestRatedRecipes();
    if (this.props.userToken) {
      this.props.getUsersFavourites(this.props.userToken, this.props.userId);
    }
    const socket = openSocket(`${process.env.REACT_APP_BACKEND_URL}`);
    socket.on("reviews", (data) => {
      if (data.action === "create") {
        this.props.setReviews(data.reviews);
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.recipeId !== this.props.match.params.recipeId) {
      this.props.getRecipeDetails(
        this.props.match.params.recipeId,
        this.props.userId
      );
    }
  }

  render() {
    const {
      recipeData,
      loading,
      recipeReviews,
      userId,
      userToken,
      favouriteRecipes,
      bestRatedRecipes,
    } = this.props;
    let doc = new jsPDF();

    const title = recipeData && recipeData.title;
    const cookingTime = recipeData && recipeData.cookingTime;
    const serves = recipeData && recipeData.serves;
    const difficulty = recipeData && recipeData.difficulty;
    const images = recipeData ? recipeData.recipeImages : [];
    const activeImage = recipeData ? recipeData.recipeImages[0] : null;
    const ingredients = recipeData ? recipeData.ingredients : [];
    const tags = recipeData ? recipeData.tags : [];
    const instructions = recipeData ? recipeData.instructions : [];
    const description = recipeData && recipeData.description;
    const creator = recipeData && recipeData.creator;
    const creationDate = recipeData && recipeData.createdAt;

    if (recipeData) {
      let elementHandler = {
        "#ignorePDF": function (element, renderer) {
          return true;
        },
      };

      let some1 = document.getElementById("ovo");
      doc.fromHTML(some1, 15, 15, {
        width: 180,
        elementHandlers: elementHandler,
      });
    }

    let content;

    let showAddRecipeContent = null;

    if (userToken && recipeReviews) {
      showAddRecipeContent = (
        <AddRecipeReviev recipeId={this.props.match.params.recipeId} />
      );
      recipeReviews.forEach((rev) => {
        if (rev.creatorId.toString() === userId.toString()) {
          showAddRecipeContent = null;
        }
      });
    } else {
      showAddRecipeContent = (
        <Link to={{ pathname: "/login" }} className="details_login">
          Log in to rate
        </Link>
      );
    }

    if (loading) {
      content = <Spinner page color="red" />;
    } else {
      content = (
        <div className="container_for_absolute">
          <div style={{ color: "red", display: "none" }} id="ovo">
            <h1 style={{ marginBottom: "20px" }}>{title}</h1>
            <p style={{ marginBottom: "13px" }}>Cooking-time: {cookingTime}</p>
            <p style={{ marginBottom: "13px" }}>Serves: {serves}</p>
            <p style={{ marginBottom: "13px" }}>Difficulty: {difficulty} </p>
            <p style={{ marginBottom: "13px" }}>
              Description: Here is a lovely dick that you can put in ur asshile
              and dance with him inside ur asshole{" "}
            </p>
            <h2 style={{ marginBottom: "20px" }}>Ingredients:</h2>
            <ul>
              {ingredients.map((ing, i) => {
                return <li key={i}>{ing}</li>;
              })}
            </ul>
            <h2 style={{ marginBottom: "20px" }}>Instructions:</h2>
            <ul>
              {instructions.map((ing, i) => {
                return <li key={i}>{ing}</li>;
              })}
            </ul>
          </div>
          <RecipeDetailsHeader
            title={title}
            cookingTime={cookingTime}
            serves={serves}
            difficulty={difficulty}
            description={description}
            creationDate={creationDate}
          />
          <main className="recipe_details_content">
            <div className="recipe_details_section_one">
              <RecipeDetailsGallery
                reviews={recipeReviews}
                images={images}
                activeImage={activeImage}
              />
              <div className="recipe_details_sec_one_part_two">
                <RecipeDetailsLinks
                  addFavourites={() => {
                    if (userToken) {
                      this.props.addRecipeToFavourites(
                        userToken,
                        userId,
                        this.props.match.params.recipeId
                      );
                    } else {
                      this.props.history.push("/login");
                    }
                  }}
                  recName={title ? title.replace(" ", "_") : null}
                  pdfRecipe={doc}
                  recId={this.props.match.params.recipeId}
                  favRecipes={favouriteRecipes}
                  creator={creator}
                  token={userToken}
                />
                <div className="recipe_details_ingredients">
                  <h3>Ingredients for {serves}:</h3>
                  <ul className="recipe_details_ingredients_list">
                    {ingredients.map((ing, i) => {
                      return (
                        <li key={i} className="recipe_details_ingredients_item">
                          <span>{i + 1}.</span> <p>{ing}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="recipe_details_section_two">
              <div className="recipe_details_section_two_part-one">
                <h3>Instructions:</h3>
                <ul className="recipe_details_instructions_list">
                  {instructions.map((ins, i) => {
                    return (
                      <li key={i} className="recipe_details_instructions_item">
                        {" "}
                        <span>{i + 1}.</span> <p>{ins}</p>
                      </li>
                    );
                  })}
                </ul>
                <div className="recipe_details_reviews">
                  {showAddRecipeContent}
                  <RecipeReviews reviews={recipeReviews} />
                </div>
              </div>
              <div className="recipe_details_section_two_part-two">
                <div className="recipe_details_tags">
                  <h3>Tags:</h3>
                  <ul className="recipe_details_tags_list">
                    {tags.map((tag, i) => {
                      return (
                        <li key={i} className="recipe_details_tags_item">
                          {tag}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="recipe_details_best_rated">
                  <h3>Top Rated:</h3>
                  {bestRatedRecipes
                    ? bestRatedRecipes.map((rec) => {
                        return (
                          <BestRatedCard
                            recId={rec._id}
                            key={rec._id}
                            title={rec.title}
                            cookingTime={rec.cookingTime}
                            creator={rec.creator}
                            image={`${process.env.REACT_APP_BACKEND_URL}/${rec.recipeImages[0]}`}
                          />
                        );
                      })
                    : null}
                </div>
                <SubscribeEmail />
              </div>
            </div>
          </main>
        </div>
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.addRecipe.loading,
    userId: state.auth.userId,
    userToken: state.auth.token,
    recipeData: state.addRecipe.recipeData,
    recipeReviews: state.user.recipeReviews,
    favouriteRecipes: state.user.favouriteRecipes,
    bestRatedRecipes: state.addRecipe.topRatedRecipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipeDetails: (recipeId, userId) =>
      dispatch(action.getRecipeDetails(recipeId, userId)),
    setReviews: (reviews) => dispatch(action.setRecipeReviews(reviews)),
    addRecipeToFavourites: (userToken, userId, recipeId) =>
      dispatch(action.addRecipeToFavourites(userToken, userId, recipeId)),
    getUsersFavourites: (userToken, userId) =>
      dispatch(action.getUsersFavouriteRecipes(userToken, userId)),
    getBestRatedRecipes: () => dispatch(action.getBestRatedRecipes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
