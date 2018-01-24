import actions from 'api/actions';

export default (state = [], action) => {

  if (action.type === actions.FETCH_KINDS_SUCCESSFUL) {
    debugger;
    return action.payload;
  }

  return state;
};
