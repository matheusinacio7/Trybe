import { connect } from "react-redux";

const getMutualEntries = (arr1, arr2) => arr1.filter((key) => arr2.indexOf(key) > -1);

const withStore = (component, stateKeys, actionArray) => {
  const mapStateToProps = stateKeys?.length
    ? (storeState) => {
        const storeKeys = Object.keys(storeState);
        const keys = getMutualEntries(stateKeys, storeKeys);

        const props = {};

        keys.forEach((key) => {
          props[key] = storeState[key];
        });

        return props;
      }
    : null;

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

export default withStore;
