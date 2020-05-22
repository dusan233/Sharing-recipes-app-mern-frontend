import React, { Component } from "react";
import Accordion from "../Accordion/Accordion";

import { withRouter } from "react-router-dom";

class RecipeFilters extends Component {
  cookingTimeFilters = name => {
    switch (name) {
      case "twentyMinutes":
        name = "0-20 minutes";
        break;
      case "trtyMinutes":
        name = "20-30 minutes";
        break;
      case "ThirtyFiftyMinutes":
        name = "30-50 minutes";
        break;
      case "fiftyMintues":
        name = "50+ minutes";
        break;
      default:
        name = name;
    }
    return name;
  };

  getFilters = (property, propertyName) => {
    const filters = [];
    const checkedVal = this.props.filters[propertyName];
    for (let key in property) {
      const name = this.cookingTimeFilters(key);
      filters.push(
        <div key={key} className="filter_checkbox_wrap">
          <input
            onChange={e => {
              this.props.onChangeCheckbox(e);
            }}
            id={name}
            name={key}
            data-catname={propertyName}
            checked={checkedVal[key] ? true : false}
            type="checkbox"
          />

          <label htmlFor={name}>{name}</label>
        </div>
      );
    }
    return filters;
  };

  getFilterContainers = () => {
    let filtersContainer = [];
    let filterSomeIndex = 0;
    for (let key in this.props.filters) {
      filterSomeIndex++;
      filtersContainer.push(
        <div
          name={`acord${filterSomeIndex}`}
          className="content"
          key={key}
          head={key}
        >
          {this.getFilters(this.props.filters[key], key)}
        </div>
      );
    }
    return filtersContainer;
  };

  render() {
    return (
      <div className="allrecipes_filters">
        <h2>Filters: </h2>
        <Accordion activeBg="white" unactiveBg="white">
          {this.getFilterContainers()}
        </Accordion>

        <button onClick={this.props.clearFilters} className="btn_filters">
          Clear Filters
        </button>
      </div>
    );
  }
}

export default withRouter(RecipeFilters);
