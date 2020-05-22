import React from "react";

import ReviewStars from "../../components/ReviewStars/ReviewStars";

import { connect } from "react-redux";
import * as action from "../../store/index";

class AddRecipeReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentValue: "",
      rate: 0
    };
  }

  componentDidMount() {
    this.cleanInputs();
  }

  onChangeInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  cleanInputs = () => {
    this.setState({
      commentValue: "",
      rate: 0
    });
  };

  onChangeRate = num => {
    this.setState({ rate: num });
  };

  render() {
    const { reviewLoading, userToken, userId, recipeId } = this.props;

    return (
      <div className="add_recipe_review">
        <h3>Rate Recipe</h3>
        <ReviewStars
          rate={this.state.rate}
          changeRate={num => {
            this.onChangeRate(num);
          }}
        />
        <label className="recipe_form_label" htmlFor="comment">
          Comment
        </label>
        <div className="recipe_form_control">
          <textarea
            onChange={e => {
              this.onChangeInput(e);
            }}
            className="recipe_form_input"
            name="commentValue"
            id="comment"
            cols="30"
            rows="4"
            value={this.state.commentValue}
          ></textarea>
        </div>
        <div
          className="empty_ingredient_error"
          style={{
            display: this.props.reviewError ? "block" : "none"
          }}
        >
          {this.props.reviewError ? this.props.reviewError : null}
        </div>
        <button
          onClick={() => {
            this.props.addRecipeReview(
              userToken,
              userId,
              recipeId,
              this.state,
              this.cleanInputs
            );
          }}
          disabled={reviewLoading ? true : false}
          className="add_review_btn"
        >
          {reviewLoading ? "Loading..." : "Add Review"}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reviewLoading: state.user.reviewLoading,
    reviewError: state.user.reviewError,
    userToken: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRecipeReview: (userToken, userId, recipeId, reviewData) =>
      dispatch(action.addRecipeReview(userToken, userId, recipeId, reviewData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeReview);
