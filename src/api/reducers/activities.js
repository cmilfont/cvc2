import uuid from 'uuid';
import moment from 'moment';
import actions from 'api/actions';
window.moment = moment;

export default (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_OFFLINE_ACTIVITIES:
      return action.payload || [];
    case actions.FETCH_ONLINE_ACTIVITIES:
      return action.payload || [];
    case actions.CREATE_ACTIVITY:
      const { kind, description, loggedAt } = action.payload;
      const activity = {
        id: uuid(),
        kind: kind.description,
        color: kind.color,
        description,
        loggedAt,
      };
      return [
        ...state,
        activity,
      ];
    case actions.UPDATE_ACTIVITY:
      return state.map(activity => (
        activity.id === action.payload.id
        ? { ...activity, ...action.payload }
        : activity
      ));
    case actions.REMOVE_ACTIVITY:
      return state.filter(activity => activity.id !== action.payload.id);
    default:
      return state;
  }
};