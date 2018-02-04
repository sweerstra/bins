import { combineReducers } from 'redux';
import {
  ADD_BIN,
  ADD_LIBRARY_IF_NEW,
  ADD_LOG,
  CLEAR_CONSOLE,
  EDIT_BIN,
  RECEIVE_BINS,
  RECEIVE_DEFAULT_LIBRARIES,
  REMOVE_BIN,
  REQUEST_BINS,
  SAVE_BIN,
  SELECT_BIN,
  SELECT_BIN_BY_ID,
  TOGGLE_LIBRARIES
} from '../constants/ActionTypes';

const updateBinProperty = (state, action, prop) => {
  return {
    ...state,
    bins: state.bins.map(bin =>
      bin._id === action._id
        ? { ...bin, [prop]: action[prop] }
        : bin
    )
  };
};

const bins = (state = { bins: [], selectedBin: { _id: '', name: '', selection: '' }, isFetching: false }, action) => {
  switch (action.type) {
    case REQUEST_BINS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_BINS:
      return {
        ...state,
        bins: action.bins,
        isFetching: false
      };
    case SELECT_BIN:
      return {
        ...state,
        selectedBin: action.bin
      };
    case SELECT_BIN_BY_ID:
      const id = action._id;
      return {
        ...state,
        selectedBin: state.bins.find(bin => bin._id === id)
      };
    case ADD_BIN:
      const { _id, name, selection } = action;
      return {
        ...state,
        bins: [...state.bins, { _id, name, selection }]
      };
    case REMOVE_BIN:
      const index = state.bins.findIndex(bin => bin._id === action._id);
      if (index === -1) return state;

      console.log({ index });

      return {
        ...state,
        bins: [
          ...state.bins.slice(0, index),
          ...state.bins.slice(index + 1)
        ]
      };
    case EDIT_BIN:
      return updateBinProperty(state, action, 'name');
    case SAVE_BIN:
      return updateBinProperty(state, action, 'selection');
    default:
      return state;
  }
};

const logs = (state = [], action) => {
  switch (action.type) {
    case ADD_LOG:
      return [
        ...state,
        { message: action.message, logType: action.logType }
      ];
    case CLEAR_CONSOLE:
      return [];
    default:
      return state;
  }
};

const libraries = (state = { defaultLibraries: [], librariesVisible: false }, action) => {
  switch (action.type) {
    case RECEIVE_DEFAULT_LIBRARIES:
      return { ...state, defaultLibraries: action.defaultLibraries };
    case ADD_LIBRARY_IF_NEW:
      const { defaultLibraries } = state;
      const { name, url } = action.library;
      const index = defaultLibraries.findIndex(library => library.name === name);

      if (index === -1) return {
        ...state,
        defaultLibraries: [
          ...state.defaultLibraries,
          { name, url }
        ]
      };
      return state;
    case TOGGLE_LIBRARIES:
      return {
        ...state,
        librariesVisible: action.librariesVisible
      };
    default:
      return state;
  }
};

export default combineReducers({ bins, logs, libraries });
