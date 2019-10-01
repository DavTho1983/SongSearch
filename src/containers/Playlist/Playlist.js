import React, { Component } from "react";
import { connect } from "react-redux";
import Auxilliary from "../../hoc/Auxilliary";
import PlayListItem from "../../components/PlayListItem/PlayListItem";

import classes from "./Playlist.css";
import * as actionTypes from "../../store/actions";

import axios from "../../hoc/axios-Firebase";

class Playlist extends Component {
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
        this.props.onGetPlaylist(playlistSongs);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.props.playlist.length > 0) {
      const results = this.props.playlist.map((playlistItem, index) => {
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

const mapStateToProps = state => {
  return {
    playlist: state.playlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPlaylist: value =>
      dispatch({
        type: actionTypes.GET_PLAYLIST,
        playlist: value
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
