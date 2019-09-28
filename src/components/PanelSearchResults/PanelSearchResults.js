import React, { Component } from "react";
import axios from "axios";

import SearchResult from "../SearchResult/SearchResult";

class PanelSearchResults extends Component {
  state = {
    searchResults: []
  };

  componentDidMount() {
    axios
      .get("/search?term=Radiohead")
      .then(response => {
        this.setState({ searchResults: response.data.results });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  resultSelectedHandler(id) {
    console.log(id);
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
          clicked={() => this.resultSelectedHandler(searchResult.trackId)}
        />
      );
    });
    return (
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
    );
  }
}

export default PanelSearchResults;
