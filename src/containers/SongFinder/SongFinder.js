import React, { Component } from "react";
import PanelSearchResults from "../../components/PanelSearchResults/PanelSearchResults";

import Auxilliary from "../../hoc/Auxilliary";

class SongFinder extends Component {
  state = {
    searchValue: "",
    finalSearchValue: ""
  };

  constructor() {
    super();
    this.submitQueryHandler = this.submitQueryHandler.bind(this);
  }

  updateInputValue(evt) {
    this.setState({
      searchValue: evt.target.value
    });
  }

  submitQueryHandler() {
    this.setState({
      finalSearchValue: this.state.searchValue
    });
    this.props.history.push({
      pathname: "/"
    });
  }

  render() {
    return (
      <Auxilliary>
        <div>
          <input
            value={this.state.searchValue}
            onChange={evt => this.updateInputValue(evt)}
          />
          <button type="submit" onClick={this.submitQueryHandler}>
            Submit
          </button>
        </div>
        <PanelSearchResults search={this.state.finalSearchValue} />
      </Auxilliary>
    );
  }
}

export default SongFinder;
