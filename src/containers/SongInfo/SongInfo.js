import React, { Component } from "react";
import { connect } from "react-redux";
import Auxilliary from "../../hoc/Auxilliary";
import * as actionTypes from "../../store/actions";

import axios from "../../hoc/axios-Firebase";

import classes from "./SongInfo.css";

class SongInfo extends Component {
  constructor(props) {
    super(props);
    this.addToPlaylistHandler = this.addToPlaylistHandler.bind(this);
  }

  addToPlaylistHandler(
    track,
    trackID,
    artistName,
    collectionName,
    kind,
    trackPrice
  ) {
    const data = {
      track: track,
      trackID: trackID,
      artistName: artistName,
      collectionName: collectionName,
      kind: kind,
      trackPrice: trackPrice
    };
    this.props.onUpdatePlaylist(data);
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
        <button
          className={classes.addToPlaylist}
          onClick={this.addToPlaylistHandler(
            this.props.track,
            this.props.id,
            this.props.artistName,
            this.props.collectionName,
            this.props.kind,
            this.props.trackPrice
          )}
        >
          Add to Playlist
        </button>
      </Auxilliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePlaylist: value =>
      dispatch({
        type: actionTypes.UPDATE_PLAYLIST,
        playlistItem: value
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongInfo);
