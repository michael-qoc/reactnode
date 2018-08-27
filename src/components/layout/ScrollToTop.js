import React, { Component } from "react";
import { toTop as scrollToPageTop } from "../../utils/scroll";
import classnames from "classnames";

class ScrollTop extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      shouldShowScrollTopArrow: false
    };
  }

  handleScroll() {
    const boundingRect = ((document || {}).documentElement || {})
      .getBoundingClientRect;
    if (boundingRect) {
      if (document.documentElement.getBoundingClientRect().top * -1 > 100)
        this.setState({ shouldShowScrollTopArrow: true });
      else this.setState({ shouldShowScrollTopArrow: false });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div className="scroll-top" onClick={e => scrollToPageTop()}>
        <div
          className={classnames(
            "arrow flex-row align-items-center justify-content-center",
            {
              hide: !this.state.shouldShowScrollTopArrow
            }
          )}
        >
          <p
            className="new-label text-center"
            style={{ marginBottom: 0, fontSize: 20 }}
          >
            <span>
              <i className="fas fa-arrow-up " />
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default ScrollTop;
