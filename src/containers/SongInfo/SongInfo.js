import React, { Component } from "react";
import Auxilliary from "../../hoc/Auxilliary";

import axios from "../../hoc/axios-Firebase";

class SongInfo extends Component {
  state = {
    trackId: null
  };

  constructor() {
    super();
    this.addToPlaylistHandler = this.addToPlaylistHandler.bind(this);
  }

  addToPlaylistHandler() {
    console.log("Add to Playlist");
    const data = {
      track: this.props.track,
      trackID: this.props.trackID,
      artistName: this.props.artistName,
      collectionName: this.props.collectionName,
      kind: this.props.kind,
      trackPrice: this.props.trackPrice
    };
    axios
      .post("/playlist.json", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Auxilliary>
        <table>
          <thead>
            <tr>
              <th>Track</th>
              <th>Track ID</th>
              <th>Artist Name</th>
              <th>Collection Name</th>
              <th>Kind</th>
              <th>Track Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.track}</td>
              <td>{this.props.id}</td>
              <td>{this.props.artistName}</td>
              <td>{this.props.collectionName}</td>
              <td>{this.props.kind}</td>
              <td>{this.props.trackPrice}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.addToPlaylistHandler}>Add to Playlist</button>
      </Auxilliary>
    );
  }
}

export default SongInfo;
