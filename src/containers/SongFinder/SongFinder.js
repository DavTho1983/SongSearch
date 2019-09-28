import React, { Component } from "react";
import PanelSearchResults from "../../components/PanelSearchResults/PanelSearchResults";
import { Route } from "react-router-dom";

import Auxilliary from "../../hoc/Auxilliary";

class SongFinder extends Component {
  render() {
    return (
      <Auxilliary>
        <Route
          path="/"
          exact
          render={() => (
            <Auxilliary>
              <div>Input Component</div>
              <div>Submit Button Component</div>
              <PanelSearchResults />
            </Auxilliary>
          )}
        />
        <Route
          path="/info"
          exact
          render={() => (
            <Auxilliary>
              <div>INFO</div>
              <div></div>
            </Auxilliary>
          )}
        />
      </Auxilliary>
    );
  }
}

export default SongFinder;
