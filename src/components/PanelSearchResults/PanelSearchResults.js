import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, withRouter } from "react-router-dom";

import Auxilliary from "../../hoc/Auxilliary";
import SearchResult from "../SearchResult/SearchResult";
import SongInfo from "../../containers/SongInfo/SongInfo";

class PanelSearchResults extends Component {
  state = {
    searchResults: [],
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
  }

  componentDidUpdate() {
    const searchQuery = "/search?term=" + this.props.search;
    axios
      .get(searchQuery)
      .then(response => {
        this.setState({ searchResults: response.data.results });
        console.log(response.data);
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

  render() {
    console.log(this.state);
    const results = this.state.searchResults.map(searchResult => {
      return (
        <SearchResult
          key={searchResult.trackId}
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
    return (
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Auxilliary>
              <h1>SEARCH {this.props.search}</h1>
              <table>
                <thead>
                  <tr>
                    <th>Track</th>
                    <th>Album</th>
                    <th>Artist</th>
                  </tr>
                </thead>
                <tbody>{results}</tbody>
              </table>
            </Auxilliary>
          )}
        />
        <Route
          path="/info"
          render={props => (
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
  }
}

export default withRouter(PanelSearchResults);
