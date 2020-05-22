import React, { Component } from "react";

import AccordionItem from "./AccordionItem/AccordionItem";
import { TiMinus, TiPlus } from "react-icons/ti";
import { IconContext } from "react-icons";

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAccordion: this.props.children[0].props.name
    };
  }

  contentShowHandler = name => {
    let newer = name;
    let current = this.state.activeAccordion;
    if (current === newer) {
      newer = null;
    }
    this.setState({
      activeAccordion: newer
    });
  };

  render() {
    return (
      <div className="container">
        {this.props.children.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div
                className="heading"
                style={{
                  backgroundColor:
                    item.props.name === this.state.activeAccordion
                      ? `${this.props.activeBg}`
                      : `${this.props.unactiveBg}`
                }}
                onClick={() => {
                  this.contentShowHandler(item.props.name);
                }}
              >
                {item.props.head}
                <span className="plus">
                  {item.props.name === this.state.activeAccordion ? (
                    <IconContext.Provider value={{ className: "plus_minus" }}>
                      <TiMinus />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider value={{ className: "plus_minus" }}>
                      <TiPlus />
                    </IconContext.Provider>
                  )}
                </span>
              </div>
              <AccordionItem
                mySt={item.props.name}
                isActive={this.state.activeAccordion}
              >
                {item}
              </AccordionItem>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default Accordion;
