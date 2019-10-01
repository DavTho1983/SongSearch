import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../hoc/axios-iTunes";
import { Route, Switch, withRouter } from "react-router-dom";

import Auxilliary from "../../hoc/Auxilliary";
import SearchResult from "../SearchResult/SearchResult";
import SongInfo from "../../containers/SongInfo/SongInfo";

import classes from "./PanelSearchResults.css";
import * as actionTypes from "../../store/actions";

class PanelSearchResults extends Component {
  constructor(props) {
    super(props);
    this.resultSelectedHandler = this.resultSelectedHandler.bind(this);
    this.getPrevTwentyFive = this.getPrevTwentyFive.bind(this);
    this.getNextTwentyFive = this.getNextTwentyFive.bind(this);
  }

  componentDidUpdate() {
    const searchQuery = "/search?term=" + this.props.search;
    axios
      .get(searchQuery)
      .then(response => {
        this.props.onGetSearchResults(response.data.results);
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
    const searchResult = { ...this.props.searchResult };
    searchResult.id = id;
    searchResult.artistName = artistName;
    searchResult.track = track;
    searchResult.collectionName = collectionName;
    searchResult.kind = kind;
    searchResult.trackPrice = trackPrice;
    this.props.onSetSearchResult(searchResult);
  }

  getPrevTwentyFive() {
    this.props.onGetPrevTwentyFive();
    console.log(this.props);
  }

  getNextTwentyFive() {
    this.props.onGetNextTwentyFive();
    console.log(this.props);
  }

  render() {
    const results = this.props.searchResults.map((searchResult, index) => {
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
                    disabled={this.props.prevDisabled}
                    onClick={this.getPrevTwentyFive}
                  >
                    Prev 25
                  </button>
                  <button
                    disabled={this.props.nextDisabled}
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
                    {results.slice(this.props.sliceStart, this.props.sliceEnd)}
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
                  id={this.props.searchResult.id}
                  artistName={this.props.searchResult.artistName}
                  track={this.props.searchResult.track}
                  collectionName={this.props.searchResult.collectionName}
                  kind={this.props.searchResult.kind}
                  trackPrice={this.props.searchResult.trackPrice}
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

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults,
    sliceStart: state.sliceStart,
    sliceEnd: state.sliceEnd,
    nextDisabled: state.nextDisabled,
    prevDisabled: state.prevDisabled,
    searchResult: state.searchResult
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetSearchResults: value =>
      dispatch({
        type: actionTypes.SET_SEARCH_RESULTS,
        searchResults: value
      }),
    onSetSearchResult: value =>
      dispatch({
        type: actionTypes.SET_INFO_SEARCH_RESULT,
        searchResult: value
      }),
    onGetPrevTwentyFive: () =>
      dispatch({
        type: actionTypes.GET_PREV_25
      }),
    onGetNextTwentyFive: () =>
      dispatch({
        type: actionTypes.GET_NEXT_25
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PanelSearchResults));
