import React, { Component } from "react";

class SongInfo extends Component {
  state = {
    trackId: null
  };

  componentDidMount() {
    // const query = new URLSearchParams(this.props.location.search);
    // const trackId = query.entries();
    console.log("PROPS", this.props);
  }
  render() {
    return (
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
    );
  }
}

export default SongInfo;
