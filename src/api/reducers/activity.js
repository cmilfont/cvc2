import actions from 'api/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATED_ACTIVITY_FORM:
      return {
        ...state,
        ...action.payload,
      }
    case actions.START_EDIT_ACTIVITY:
      return {
        ...state,
        ...action.payload,
      };
    case actions.SAVE_EDIT_ACTIVITY:
      return {};
    case actions.CANCEL_EDIT_ACTIVITY:
      return {};
    default:
      return state;
  }
};