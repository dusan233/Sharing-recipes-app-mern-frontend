import React, { lazy, Suspense } from "react";

import { connect } from "react-redux";
import * as action from "./store/index";
import "./App.scss";

import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SideBar from "./components/SideBar/SideBar";

import Spinner from "./components/Spinner/Spinner";

// const Home = lazy(() => import("./containers/Home/Home"));
import Home from "./containers/Home/Home";
import Footer from "./components/Footer/Footer";
const Login = lazy(() => import("./containers/Login/Login"));
const Signup = lazy(() => import("./containers/Signup/Signup"));
const AddRecipe = lazy(() => import("./containers/AddRecipe/AddRecipe"));
const UserRecipes = lazy(() => import("./containers/UserRecipes/UserRecipes"));
const PageNotFound = lazy(() => import("./components/404/PageNotFound"));
const AllRecipes = lazy(() => import("./containers/AllRecipes/AllRecipes"));
const RecipeDetails = lazy(() =>
  import("./containers/RecipeDetails/RecipeDetails")
);
const UserProfile = lazy(() => import("./containers/UserProfile/UserProfile"));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStorageReady: false,
      userDropdown: false,
      activeSideBar: false,
      sidebarDropdown: false,
    };

    this.userDropdownRef = React.createRef();
    this.navigationBarRef = React.createRef();
  }

  componentDidMount() {
    this.props.getTokenFromStorage();
    this.props.getUserDataFromStorage();
    this.setState({ localStorageReady: true });
    window.addEventListener("mousedown", this.handleClickOutside);
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleOnScroll = () => {
    let page = document.body || document.documentElement;
    if (window.pageYOffset > 0) {
      this.navigationBarRef.current.style.position = "fixed";
      page.style.paddingTop = this.navigationBarRef.current.offsetHeight + "px";
    } else {
      this.navigationBarRef.current.style.position = "relative";
      page.style.paddingTop = "0px";
    }
  };

  handleSideBar = () => {
    this.setState((prevState) => {
      return {
        activeSideBar: !prevState.activeSideBar,
      };
    });
  };

  handleSideBarDropdown = () => {
    this.setState((prevState) => {
      return {
        sidebarDropdown: !prevState.sidebarDropdown,
      };
    });
  };

  handleClickOutside = (event) => {
    if (this.userDropdownRef.current) {
      if (!this.userDropdownRef.current.contains(event.target)) {
        if (this.state.userDropdown) {
          this.setState({
            userDropdown: false,
          });
        }
      }
    }
  };

  handleClickOnSidebarOverlay = (event) => {
    if (event.target.classList.contains("sidebra_overlay")) {
      this.setState({ activeSideBar: false });
    }
  };

  toggleUserDropdown = () => {
    this.setState((prevState) => {
      return {
        userDropdown: !prevState.userDropdown,
        activeSideBar: false,
      };
    });
  };

  render() {
    const { isAuth, username } = this.props;
    let routes = this.state.localStorageReady ? (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/create-recipe" component={AddRecipe} />
        <Route
          path="/user/recipes"
          exact
          render={() => <UserRecipes favourites={false} />}
        />
        <Route path="/user/profile" component={UserProfile} />
        <Route path="/recipes" component={AllRecipes} />
        <Route
          path="/user/recipes/favourites"
          render={() => <UserRecipes favourites={true} />}
        />
        <Route path="/recipe/:recipeId" component={RecipeDetails} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    ) : null;

    return (
      <React.Fragment>
        <Navbar
          ref={{ refOne: this.userDropdownRef, refTwo: this.navigationBarRef }}
          userDropdown={this.state.userDropdown}
          isAuth={isAuth}
          username={username}
          logout={this.props.logOut}
          toogleUserDropdown={this.toggleUserDropdown}
          toogleSideBar={this.handleSideBar}
        />
        {this.state.activeSideBar ? (
          <div
            onClick={this.handleClickOnSidebarOverlay}
            className="sidebra_overlay"
          ></div>
        ) : null}

        <SideBar
          closeSidebarDropdown={this.handleSideBarDropdown}
          closeSidebar={this.handleSideBar}
          active={this.state.activeSideBar}
          sidebarDropdownActive={this.state.sidebarDropdown}
        />
        <Suspense fallback={<Spinner page color="red" />}>{routes}</Suspense>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token,
    username: state.auth.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTokenFromStorage: () => dispatch(action.getTokenFromStorage()),
    getUserDataFromStorage: () => dispatch(action.getUserDataFromStorage()),
    logOut: () => dispatch(action.Logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
