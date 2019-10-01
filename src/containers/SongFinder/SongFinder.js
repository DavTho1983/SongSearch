import React, { Component } from "react";
import { connect } from "react-redux";
import PanelSearchResults from "../../components/PanelSearchResults/PanelSearchResults";
import Playlist from "../Playlist/Playlist";

import classes from "./SongFinder.css";
import Auxilliary from "../../hoc/Auxilliary";
import * as actionTypes from "../../store/actions";

class SongFinder extends Component {
  props: {
    searchValue: string;
    finalSearchValue: string;
    onUpdateSearchValue: any;
    onSubmitQuery: any;
    history: any;
  };

  constructor(props) {
    super(props);
    this.onSubmitQueryHandler = this.onSubmitQueryHandler.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  updateInputValue(evt) {
    this.props.onUpdateSearchValue(evt.target.value);
    console.log(this.props);
  }

  onSubmitQueryHandler() {
    console.log(this.props);
    const searchValue = this.props.searchValue;
    this.props.onSubmitQuery(searchValue);
    this.props.history.push({
      pathname: "/"
    });
  }

  render() {
    if (this.props) {
      return (
        <Auxilliary>
          <div className={classes.panel}>
            <input
              className="searchBox"
              type="text"
              value={this.props.searchValue}
              onChange={evt => this.updateInputValue(evt)}
            />
            <button type="submit" onClick={this.onSubmitQueryHandler}>
              Submit
            </button>
          </div>
          <div className={classes.panel}>
            <h1>Playlist</h1>
            <Playlist />
          </div>
          <PanelSearchResults search={this.props.finalSearchValue} />
        </Auxilliary>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    searchValue: state.searchValue,
    finalSearchValue: state.finalSearchValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateSearchValue: value =>
      dispatch({
        type: actionTypes.UPDATE_INPUT_VALUE,
        searchValue: value
      }),
    onSubmitQuery: value =>
      dispatch({
        type: actionTypes.SUBMIT_QUERY,
        finalSearchValue: value
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongFinder);
