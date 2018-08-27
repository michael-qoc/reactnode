import React, { Component } from "react";
import { toElement as scrollToElement } from "../../utils/scroll";
import classnames from "classnames";

class ScrollToNext extends Component {
  scrollToNext() {
    const { pageSelector } = this.props;
    const nextPage = document.querySelector(pageSelector);
    scrollToElement(nextPage);
  }

  render() {
    const { fontColor, position } = this.props;
    return (
      <div
        className={classnames("scroll-to-next ", {
          "scroll-arrow-position-two": position === "two",
          "scroll-arrow-position": position === "one"
        })}
        onClick={e => this.scrollToNext()}
      >
        <div className="arrow bounce" style={{ color: fontColor }}>
          <div className="scroll-text">Click Me</div>
          <span>
            <i className="fas fa-chevron-down fa-2x" />
          </span>
        </div>
      </div>
    );
  }
}

ScrollToNext.defaultProps = {
  fontColor: "#2BA7AB",
  position: "one"
};

export default ScrollToNext;
