import React from "react";

import "./SearchResult.css";

const searchResult = props => (
  <tr className="SearchResult" onClick={props.clicked}>
    <td className="Artist">{props.track}</td>
    <td>{props.album}</td>
    <td>{props.artist}</td>
  </tr>
);

export default searchResult;
