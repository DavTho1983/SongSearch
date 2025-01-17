import * as actionTypes from "./actions";

const initialState = {
  searchValue: "",
  finalSearchValue: "",
  searchResults: [],
  sliceStart: 0,
  sliceEnd: 25,
  nextDisabled: false,
  prevDisabled: true,
  searchResult: {
    id: null,
    artistId: null,
    artistName: "",
    track: "",
    collectionName: "",
    kind: "",
    trackPrice: null
  },
  playlist: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_INPUT_VALUE:
      return {
        ...state,
        searchValue: action.searchValue
      };
    case actionTypes.SUBMIT_QUERY:
      return {
        ...state,
        finalSearchValue: action.finalSearchValue
      };
    case actionTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults
      };
    case actionTypes.GET_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist
      };
    case actionTypes.UPDATE_PLAYLIST:
      const newPlaylist = state.playlist;
      newPlaylist.push(action.playlistItem);
      return {
        ...state,
        playlist: [...state.playlist, action.playlistItem]
      };
    case actionTypes.SET_INFO_SEARCH_RESULT:
      return {
        ...state,
        searchResult: {
          id: action.searchResult.id,
          artistId: action.searchResult.artistId,
          artistName: action.searchResult.artistName,
          track: action.searchResult.track,
          collectionName: action.searchResult.collectionName,
          kind: action.searchResult.kind,
          trackPrice: action.searchResult.trackPrice
        }
      };
    case actionTypes.GET_PREV_25:
      if (state.sliceStart - 25 >= 0) {
        const newSliceStart = state.sliceStart - 25;
        const newSliceEnd = state.sliceEnd - 25;
        state.sliceStart = newSliceStart;
        state.sliceEnd = newSliceEnd;
        state.nextDisabled = false;
        if (0 <= newSliceStart) {
          state.prevDisabled = true;
        }
      }
      return {
        ...state,
        sliceStart: state.sliceStart,
        sliceEnd: state.sliceEnd,
        prevDisabled: state.prevDisabled,
        nextDisabled: state.nextDisabled
      };
    case actionTypes.GET_NEXT_25:
      if (state.sliceEnd < state.searchResults.length) {
        const newSliceStart = state.sliceStart + 25;
        const newSliceEnd = state.sliceEnd + 25;
        state.sliceStart = newSliceStart;
        state.sliceEnd = newSliceEnd;
        state.prevDisabled = false;
        if (state.searchResults.length === newSliceEnd) {
          state.nextDisabled = true;
        }
      }
      return {
        ...state,
        sliceStart: state.sliceStart,
        sliceEnd: state.sliceEnd,
        prevDisabled: state.prevDisabled,
        nextDisabled: state.nextDisabled
      };
    default:
      return state;
  }
};

export default reducer;
