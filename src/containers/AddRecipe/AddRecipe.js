import React, { Component } from "react";

import BackgroundImage from "../../assets/photo-1504674900247-0877df9cc836.jpg";

import { connect } from "react-redux";
import * as action from "../../store/index";

import AddRecipeBasics from "../../components/AddRecipeBasics/AddRecipeBasics";
import AddRecipeIngredients from "../../components/AddRecipeIngredients/AddRecipeIngredients";
import AddRecipeInstructions from "../../components/AddRecipeInstructions/AddRecipeInstructions";
import AddRecipeTags from "../../components/AddRecipeTags/AddRecipeTags";
import AddRecipeImages from "../../components/AddRecipeImages/AddRecipeImages";
import { Redirect } from "react-router";

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      serve: "2 persons",
      cookingTime: "0-20 minutes",
      difficulty: "easy",
      category: "cakes",
      course: "breakfast",
      description: "",
      ingredients: [],
      instructions: [],
      tags: [],
      images: [],
      image: null,
      previewImages: [],
      publicly: true,
      emptyIngredientInput: null,
      emptyInstructionInput: null,
      emptyTagInput: null
    };
    this.ingredientInput = React.createRef();
    this.instructionInput = React.createRef();
    this.tagInput = React.createRef();
  }

  componentDidMount() {
    this.props.cleanErrors();
    this.props.clearSuccess();
  }

  resetInputs = () => {
    this.setState({
      title: "",
      serve: "2 persons",
      cookingTime: "0-20 minutes",
      difficulty: "easy",
      category: "cakes",
      course: "breakfast",
      description: "",
      ingredients: [],
      instructions: [],
      tags: [],
      images: [],
      image: null,
      publicly: true,
      previewImages: [],
      emptyIngredientInput: null,
      emptyInstructionInput: null,
      emptyTagInput: null
    });
  };

  onChangeInput = e => {
    let targetEl;
    let target = e.target.name;
    targetEl = e.target.value;

    let targetChecked = e.target.checked;

    this.setState({
      [target]: target === "publicly" ? targetChecked : targetEl
    });
  };

  onAddIngredient = () => {
    if (this.ingredientInput.current.value === "") {
      return this.setState({
        emptyIngredientInput: "Input can't be empty."
      });
    }

    const ingredients = [...this.state.ingredients];
    ingredients.push(this.ingredientInput.current.value);
    this.setState({
      ingredients: ingredients,
      emptyIngredientInput: ""
    });
    this.ingredientInput.current.value = "";
  };

  onAddInstruction = () => {
    if (this.instructionInput.current.value === "") {
      return this.setState({
        emptyInstructionInput: "Input can't be empty"
      });
    }

    const instructions = [...this.state.instructions];
    instructions.push(this.instructionInput.current.value);
    this.setState({
      instructions: instructions,
      emptyInstructionInput: ""
    });
    this.instructionInput.current.value = "";
  };

  onAddTag = () => {
    if (this.tagInput.current.value === "") {
      return this.setState({
        emptyTagInput: "Input can't be empty"
      });
    }

    const tags = [...this.state.tags];
    tags.push(this.tagInput.current.value);
    this.setState({
      tags: tags,
      emptyTagInput: ""
    });
    this.tagInput.current.value = "";
  };

  onDeleteTag = tag => {
    const newTags = this.state.tags.filter(tg => {
      return tg !== tag;
    });
    this.setState({
      tags: newTags
    });
  };

  onDeleteIngredient = ing => {
    const newIngredients = this.state.ingredients.filter(ingred => {
      return ingred !== ing;
    });
    this.setState({
      ingredients: newIngredients
    });
  };

  onDeleteInstruction = ins => {
    const newInstructions = this.state.instructions.filter(instr => {
      return instr !== ins;
    });
    this.setState({
      instructions: newInstructions
    });
  };

  generateBase64FromImage = imageFile => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = e => resolve(e.target.result);
      reader.onerror = err => reject(err);
    });

    reader.readAsDataURL(imageFile);
    return promise;
  };

  onAddImage = e => {
    let allFiles = [];
    const previewImages = [];
    for (let key in e.target.files) {
      if (key !== "length" && key !== "item") {
        allFiles.push(e.target.files[key]);
        this.generateBase64FromImage(e.target.files[key]).then(base64 => {
          previewImages.push(base64);
          this.setState({
            images: allFiles,
            previewImages: previewImages
          });
        });
      }
    }
  };

  render() {
    const { userToken, userId, recipeErrors, loading, success } = this.props;
    const {
      title,
      description,
      serve,
      cookingTime,
      difficulty,
      ingredients,
      emptyIngredientInput,
      instructions,
      emptyInstructionInput,
      tags,
      previewImages,
      emptyTagInput
    } = this.state;

    if (!userToken) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location.pathname }
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <div
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          className="add_recipe_header"
        ></div>
        <div className="recipe_forms_container">
          <AddRecipeBasics
            changeInputHandler={e => {
              this.onChangeInput(e);
            }}
            title={title}
            description={description}
            serve={serve}
            cookingTime={cookingTime}
            difficulty={difficulty}
            valError={recipeErrors}
          />
          <AddRecipeIngredients
            addIngredient={this.onAddIngredient}
            ref={this.ingredientInput}
            ingredients={ingredients}
            validationError={emptyIngredientInput}
            valError={recipeErrors}
            deleteIngredient={ing => {
              this.onDeleteIngredient(ing);
            }}
          />
          <AddRecipeInstructions
            addInstruction={this.onAddInstruction}
            ref={this.instructionInput}
            instructions={instructions}
            validationError={emptyInstructionInput}
            valError={recipeErrors}
            deleteInstruction={ins => {
              this.onDeleteInstruction(ins);
            }}
          />
          <AddRecipeTags
            addTag={this.onAddTag}
            ref={this.tagInput}
            tags={tags}
            validationError={emptyTagInput}
            valError={recipeErrors}
            deleteTag={tag => {
              this.onDeleteTag(tag);
            }}
          />
          <AddRecipeImages
            addImage={this.onAddImage}
            recipeImages={previewImages}
            valError={recipeErrors}
          />

          <input
            name="publicly"
            className="recipe_form_checkbox"
            checked={this.state.publicly}
            id="chek"
            type="checkbox"
            onChange={e => {
              this.onChangeInput(e);
            }}
          />
          <label className="recipe_form_checkbox_label" htmlFor="chek"></label>
          <label> Publish this recipe public. </label>
          <button
            onClick={() => {
              this.props.addRecipe(
                this.state,
                userToken,
                userId,
                this.resetInputs
              );
            }}
            disabled={loading}
            className="recipe_form_submit"
          >
            {loading ? "Sending..." : "Submit Recipe"}
          </button>
          <div
            style={{ display: success ? "block" : "none" }}
            className="recipe_form_success"
          >
            'You have sent a recipe successfully!'
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.addRecipe.loading,
    userToken: state.auth.token,
    userId: state.auth.userId,
    recipeErrors: state.addRecipe.recipeErrors,
    success: state.addRecipe.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRecipe: (recipeData, userToken, userId, resetInputs) =>
      dispatch(action.addRecipe(recipeData, userToken, userId, resetInputs)),
    cleanErrors: () => dispatch(action.cleanAddRecipeErrors()),
    clearSuccess: () => dispatch(action.clearSuccess())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
