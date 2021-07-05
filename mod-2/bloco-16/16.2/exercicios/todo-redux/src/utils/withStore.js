import { createStore } from "redux";
import { connect } from "react-redux";

import { rootReducer } from "../reducers";

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const getMutualEntries = (arr1, arr2) => arr1.filter((key) => arr2.indexOf(key) > -1);

export const withStore = (component, stateKeys, actionArray) => {
  const mapStateToProps = (storeState) => {
    if (!stateKeys) return null;

    const storeKeys = Object.keys(storeState);
    const keys = getMutualEntries(stateKeys, storeKeys);

    const props = {};

    keys.forEach((key) => {
      props[key] = storeState[key];
    });

    return props;
  };

  if (!actionArray) return connect(mapStateToProps)(component);

  const mapDispatchToProps = (dispatch) => {
    const props = {};

    actionArray.forEach((action) => {
      props[action.name] = (payload) => dispatch(action(payload));
    });

    return props;
  };

  return connect(mapStateToProps, mapDispatchToProps)(component);
}
