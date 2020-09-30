import { connect } from 'react-redux';

/**
 * @private 
 */
const mapStateToProps = (props) => {
    // return null if no props were requested
    if ([undefined, null].includes(props)) return null;
    // return the 'mapStateToProps' function
    return (state) =>
      Object.entries(props).reduce((_propObj, [store, rawProps]) => {
        rawProps.forEach((prop) => {
            _propObj[prop] = state[store][prop];
        });
        return _propObj;
      }, {}); 
}

/**
 * @private 
 */
const mapDispatchToProps = (actions) => {
  // return null if no actions were requested
  if ([undefined, null].includes(actions)) return null;
  // get redux's action creator
  const { bindActionCreators } = require("redux");
  // return the 'mapDispatchToProps' function
  return (dispatch) =>
    Object.entries(actions).reduce((_actionObj, [store, rawActions]) => {
      rawActions.forEach((action) => {
        const actionFn = require(`./stores/${store}/actions`)[action];
        _actionObj[action] = bindActionCreators(actionFn, dispatch);
      });
      return _actionObj;
    }, {});
};

/**
 * @param {Object|null|undefined} props arg format: 
 *        {
 *             <store name>: [<prop name>, <prop name>, ... , <prop name>],
 *                 .
 *                 .
 *                 .
 *             <store name>: [<prop name>, <prop name>, ... , <prop name>],
 *        }
 * @param {Object|null|undefined} actions arg format:
 *        {
 *             <store name>: [<action function name>, ... , <action function name>],
 *                 .
 *                 .
 *                 .
 *             <store name>: [<action function name>, ... , <action function name>],
 *        }
 * NOTE: <prop name> and <action function name> are of type 'String'.
 */
export default ({ props, actions }) => (Component) => connect(mapStateToProps(props), mapDispatchToProps(actions))(Component);
