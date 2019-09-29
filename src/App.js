import React, { Component } from "react";
import { Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import SongFinder from "./containers/SongFinder/SongFinder";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" component={SongFinder} />
        </Layout>
      </div>
    );
  }
}

export default App;
