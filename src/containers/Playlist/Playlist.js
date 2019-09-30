import React, { Component } from "react";
import Auxilliary from "../../hoc/Auxilliary";
import PlayListItem from "../../components/PlayListItem/PlayListItem";

import classes from "./Playlist.css";

import axios from "../../hoc/axios-Firebase";

class Playlist extends Component {
  state = {
    playlist: []
  };
  componentDidMount() {
    const searchQuery = "/playlist.json";
    axios
      .get(searchQuery)
      .then(response => {
        console.log("FIREBASE RESPONSE", response);
        const playlistSongs = [];
        for (let song in response.data) {
          playlistSongs.push({
            artistName: response.data[song].artistName,
            trackName: response.data[song].track,
            collectionName: response.data[song].collectionName
          });
        }
        console.log(playlistSongs);
        this.setState({ playlist: playlistSongs });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.playlist.length > 0) {
      const results = this.state.playlist.map((playlistItem, index) => {
        return (
          <PlayListItem
            key={index}
            artist={playlistItem.artistName}
            track={playlistItem.trackName}
            album={playlistItem.collectionName}
          />
        );
      });
      return (
        <Auxilliary>
          <table className={classes.playlistTable}>
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
      );
    } else {
      return null;
    }
  }
}

export default Playlist;
