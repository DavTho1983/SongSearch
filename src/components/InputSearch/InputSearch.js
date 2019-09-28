import React, { Component } from "react";
import axios from "axios";

import SearchResult from "../SearchResult/SearchResult";

const BASE_URL = "https://itunes.apple.com";

class InputSearch extends Component {
  state = {
    searchResults: []
  };

  componentDidMount() {
    axios.get(BASE_URL + "/search?term=Radiohead").then(response => {
      this.setState({ searchResults: response.data.results });
      console.log(response.data);
    });
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
        />
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Track</th>
            <th>Album</th>
          </tr>
        </thead>
        <tbody>{results}</tbody>
      </table>
    );
  }
}

export default InputSearch;
