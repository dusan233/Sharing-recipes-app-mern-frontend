import React from "react";

import { connect } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";
import RecipeFilters from "../../components/RecipeFilters/RecipeFilters";
import Modal from "../../components/Modal/Modal";

import * as action from "../../store/index";

import RecipeCard from "../../components/RecipeCard/RecipeCard";

class AllRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        difficulty: {
          easy: "",
          medium: "",
          hard: "",
        },
        category: {
          pizza: "",
          pasta: "",
          drinks: "",
          cakes: "",
          salad: "",
          soup: "",
          other: "",
        },
        course: {
          lunch: "",
          breakfast: "",
          dinner: "",
          desert: "",
          appetizer: "",
        },
        cookingTime: {
          twentyMinutes: "",
          trtyMinutes: "",
          ThirtyFiftyMinutes: "",
          fiftyMintues: "",
        },
      },
      queryParams: this.props.location.search,
      showFilters: window.innerWidth > 620 ? true : false,
      showModalFilters: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    if (this.props.location.search !== "") {
      this.getCheckedFiltersOnRefresh();
    } else {
      this.props.filterRecipes(this.state.filters);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location.search !== prevProps.location.search &&
      this.props.location.state
    ) {
      if (this.props.location.state.fromDropdown) {
        this.getCheckedFiltersOnRefresh();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  toggleSidebarFilters = () => {
    this.setState((prevState) => ({
      showModalFilters: !prevState.showModalFilters,
    }));
  };

  handleResize = () => {
    if (window.innerWidth <= 620 && this.state.showFilters === true) {
      this.setState({
        showFilters: false,
      });
    } else if (window.innerWidth > 620 && this.state.showFilters === false) {
      this.setState({
        showFilters: true,
      });
    }
  };

  clearAllFilters = () => {
    const clearedFilters = {};
    for (let key in this.state.filters) {
      clearedFilters[key] = {};
      for (let keyTwo in this.state.filters[key]) {
        clearedFilters[key][keyTwo] = "";
      }
    }
    this.props.history.push({
      pathname: "/recipes",
      search: "",
    });
    this.props.filterRecipes(clearedFilters);
    this.setState({
      filters: clearedFilters,
    });
    console.log(clearedFilters);
  };

  getCheckedFiltersOnRefresh = () => {
    const filters = {}; //JSON.parse(JSON.stringify(this.state.filters));
    for (let key in this.state.filters) {
      filters[key] = {};
      for (let keyTwo in this.state.filters[key]) {
        filters[key][keyTwo] = "";
      }
    }
    const queryParams = this.props.location.search;
    const splitedQuery = queryParams
      .slice(1, queryParams.length)
      .replace(/&/g, "=")
      .split("=");
    const finalQuerys = splitedQuery.map((qry) => {
      return qry.replace(/%20/g, " ");
    });

    finalQuerys.forEach((el, i) => {
      if (
        el === "difficulty" ||
        el === "category" ||
        el === "course" ||
        el === "cookingTime"
      ) {
        const objecto = filters[el];
        if (finalQuerys[i + 1] === "0-20 minutes") {
          objecto["twentyMinutes"] = finalQuerys[i + 1];
        } else if (finalQuerys[i + 1] === "20-30 minutes") {
          objecto["trtyMinutes"] = finalQuerys[i + 1];
        } else if (finalQuerys[i + 1] === "30-50 minutes") {
          objecto["ThirtyFiftyMinutes"] = finalQuerys[i + 1];
        } else if (finalQuerys[i + 1] === "50+ minutes") {
          objecto["fiftyMinutes"] = finalQuerys[i + 1];
        } else {
          objecto[finalQuerys[i + 1]] = finalQuerys[i + 1];
        }
      }
    });

    this.props.filterRecipes(filters);
    this.setState({
      filters: filters,
    });
  };

  removeQueryParam = (queryParams, removeTheQuery) => {
    const newQueryParams = queryParams
      .filter((qry) => qry !== removeTheQuery)
      .join("&");
    this.props.history.push({
      pathname: "/recipes",
      search: newQueryParams,
    });
  };

  onChangeCheckbox = (e) => {
    const value = e.target.id;
    const target = e.target.name;
    const propertyName = e.target.dataset.catname;

    const filters = { ...this.state.filters };

    for (let key in filters) {
      let objecto = filters[key];
      if (objecto[value] !== undefined) {
        if (objecto[value] === "") {
          objecto[value] = value;
          if (this.props.location.search === "") {
            this.props.history.push({
              pathname: "/recipes",
              search: `?${propertyName}=${value}`,
            });
          } else {
            this.props.history.push({
              pathname: "/recipes",
              search: `${this.props.location.search}&${propertyName}=${value}`,
            });
          }
        } else {
          objecto[value] = "";
          const queryParams = this.props.location.search.split("&");

          if (queryParams[0] === `?${propertyName}=${value}`) {
            this.removeQueryParam(queryParams, `?${propertyName}=${value}`);
          } else {
            this.removeQueryParam(queryParams, `${propertyName}=${value}`);
          }
        }
      } else if (objecto[target] !== undefined) {
        if (objecto[target] === "") {
          objecto[target] = value;
          if (this.props.location.search === "") {
            this.props.history.push({
              pathname: "/recipes",
              search: `?${propertyName}=${value}`,
            });
          } else {
            this.props.history.push({
              pathname: "/recipes",
              search: `${this.props.location.search}&${propertyName}=${value}`,
            });
          }
        } else {
          objecto[target] = "";
          const queryParams = this.props.location.search
            .replace(/%20/g, " ")
            .split("&");

          if (queryParams[0] === `?${propertyName}=${value}`) {
            this.removeQueryParam(queryParams, `?${propertyName}=${value}`);
          } else {
            this.removeQueryParam(queryParams, `${propertyName}=${value}`);
          }
        }
      }
    }
    this.props.filterRecipes(filters);
    this.setState({
      filters: filters,
    });
  };

  onChangePage = (e) => {
    const wantedPage = parseInt(e.target.innerHTML);

    this.props.filterRecipes(this.state.filters, wantedPage);
  };

  nextPage = () => {
    this.props.filterRecipes(
      this.state.filters,
      parseInt(this.props.currentPage) + 1
    );
  };

  prevPage = () => {
    this.props.filterRecipes(this.state.filters, this.props.currentPage - 1);
  };

  render() {
    const {
      recipes,
      favouriteRecipes,
      isAuth,
      userId,
      recCardLoading,
      currentRecLoading,
      recipesCount,
      currentPage,
    } = this.props;

    const sidebarFiltersClasses = this.state.showModalFilters
      ? "modal_filters show"
      : "modal_filters";

    return (
      <div className="container_for_absolutee">
        <div className="allrecipes_wrap_content">
          {this.state.showFilters ? (
            <RecipeFilters
              clearFilters={this.clearAllFilters}
              filters={this.state.filters}
              onChangeCheckbox={this.onChangeCheckbox}
            />
          ) : (
            <button
              onClick={this.toggleSidebarFilters}
              className="show_filters_button"
            >
              Filters
            </button>
          )}
          <Modal>
            <div className={sidebarFiltersClasses}>
              <span
                onClick={this.toggleSidebarFilters}
                className="close_sidebar_filters"
              >
                X
              </span>
              <RecipeFilters
                clearFilters={this.clearAllFilters}
                filters={this.state.filters}
                onChangeCheckbox={this.onChangeCheckbox}
              />
            </div>
          </Modal>
          <div className="allrecipes_recipes_container">
            {this.props.loading ? (
              <Spinner big color="red" />
            ) : (
              <React.Fragment>
                <div className="allrecipes_recipes">
                  {recipes.map((recipe) => {
                    return (
                      <RecipeCard
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
                  })}
                </div>

                <div className="pagination_container">
                  <Pagination
                    recipesCount={recipesCount}
                    currentPage={currentPage}
                    prevPage={this.prevPage}
                    nextPage={this.nextPage}
                    onChangePage={this.onChangePage}
                  />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.addRecipe.allRecipesLoading,
    recipes: state.addRecipe.allRecipes,
    favouriteRecipes: state.user.favouriteRecipes,
    isAuth: state.auth.token,
    recCardLoading: state.user.recCardLoading,
    currentRecLoading: state.user.currentLoadingRec,
    userId: state.auth.userId,
    recipesCount: state.addRecipe.recipesCount,
    currentPage: state.addRecipe.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRecipes: () => dispatch(action.getAllRecipes()),
    getUsersFavourites: (userToken, userId) =>
      dispatch(action.getUsersFavouriteRecipes(userToken, userId)),
    addRecipeToFavourites: (userToken, userId, recipeId) =>
      dispatch(action.addRecipeToFavourites(userToken, userId, recipeId)),
    filterRecipes: (filters, page) =>
      dispatch(action.filterRecipes(filters, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes);
