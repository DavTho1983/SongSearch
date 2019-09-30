import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, withRouter } from "react-router-dom";

import Auxilliary from "../../hoc/Auxilliary";
import SearchResult from "../SearchResult/SearchResult";
import SongInfo from "../../containers/SongInfo/SongInfo";

import classes from "./PanelSearchResults.css";

class PanelSearchResults extends Component {
  state = {
    searchResults: [],
    sliceStart: 0,
    sliceEnd: 25,
    nextDisabled: false,
    prevDisabled: true,
    current25: [],
    searchResult: {
      id: null,
      artistId: null,
      artistName: "",
      track: "",
      collectionName: "",
      kind: "",
      trackPrice: null
    }
  };

  constructor() {
    super();
    this.resultSelectedHandler = this.resultSelectedHandler.bind(this);
    this.getPrevTwentyFive = this.getPrevTwentyFive.bind(this);
    this.getNextTwentyFive = this.getNextTwentyFive.bind(this);
  }

  componentDidUpdate() {
    const searchQuery = "/search?term=" + this.props.search;
    axios
      .get(searchQuery)
      .then(response => {
        this.setState({ searchResults: response.data.results });
      })
      .catch(error => {
        console.log(error);
      });
  }

  resultSelectedHandler(
    id,
    artistName,
    track,
    collectionName,
    kind,
    trackPrice
  ) {
    const queryParams = id;
    let path = "/info";
    this.props.history.push({
      pathname: path,
      search: "?" + queryParams
    });
    const searchResult = { ...this.state.searchResult };
    searchResult.id = id;
    searchResult.artistName = artistName;
    searchResult.track = track;
    searchResult.collectionName = collectionName;
    searchResult.kind = kind;
    searchResult.trackPrice = trackPrice;
    this.setState({ searchResult });
  }

  getPrevTwentyFive() {
    if (this.state.sliceStart - 25 >= 0) {
      const newSliceStart = this.state.sliceStart - 25;
      const newSliceEnd = this.state.sliceEnd - 25;
      this.setState({ sliceStart: newSliceStart });
      this.setState({ sliceEnd: newSliceEnd });
      this.setState({ nextDisabled: false });
      if (0 <= newSliceStart) {
        this.setState({ prevDisabled: true });
      }
    }
  }

  getNextTwentyFive() {
    if (this.state.sliceEnd < this.state.searchResults.length) {
      const newSliceStart = this.state.sliceStart + 25;
      const newSliceEnd = this.state.sliceEnd + 25;
      this.setState({ sliceStart: newSliceStart });
      this.setState({ sliceEnd: newSliceEnd });
      this.setState({ prevDisabled: false });
      if (this.state.searchResults.length === newSliceEnd) {
        this.setState({ nextDisabled: true });
      }
    }
  }

  render() {
    const results = this.state.searchResults.map((searchResult, index) => {
      return (
        <SearchResult
          key={index}
          artist={searchResult.artistName}
          track={searchResult.trackName}
          album={searchResult.collectionName}
          clicked={() =>
            this.resultSelectedHandler(
              searchResult.trackId,
              searchResult.artistName,
              searchResult.trackName,
              searchResult.collectionName,
              searchResult.kind,
              searchResult.trackPrice
            )
          }
        />
      );
    });
    if (results.length !== 0) {
      return (
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Auxilliary>
                <div className={classes.container}>
                  <button
                    disabled={this.state.prevDisabled}
                    onClick={this.getPrevTwentyFive}
                  >
                    Prev 25
                  </button>
                  <button
                    disabled={this.state.nextDisabled}
                    onClick={this.getNextTwentyFive}
                  >
                    Next 25
                  </button>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Track</th>
                      <th>Album</th>
                      <th>Artist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.slice(this.state.sliceStart, this.state.sliceEnd)}
                  </tbody>
                </table>
              </Auxilliary>
            )}
          />
          <Route
            path="/info"
            render={() => (
              <Auxilliary>
                <h1>Info</h1>
                <SongInfo
                  id={this.state.searchResult.id}
                  artistName={this.state.searchResult.artistName}
                  track={this.state.searchResult.track}
                  collectionName={this.state.searchResult.collectionName}
                  kind={this.state.searchResult.kind}
                  trackPrice={this.state.searchResult.trackPrice}
                />
              </Auxilliary>
            )}
          />
        </Switch>
      );
    } else {
      return <span></span>;
    }
  }
}

export default withRouter(PanelSearchResults);
