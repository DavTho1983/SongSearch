import React from "react";

const PlayListItem = props => (
  <tr>
    <td>{props.track}</td>
    <td>{props.album}</td>
    <td>{props.artist}</td>
  </tr>
);

export default PlayListItem;
