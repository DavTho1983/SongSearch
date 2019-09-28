import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import SongFinder from "./containers/SongFinder/SongFinder";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <SongFinder />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
