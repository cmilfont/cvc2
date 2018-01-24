import { call, select, takeLatest } from 'redux-saga/effects';
import actions from 'api/actions';
import localForage from 'localforage';
import { updateActivityMutation as mutation } from 'api/graphql/mutations';
import uuid from 'uuid/v4';

function* updateActivity(graphqlClient, action) {
  try {
    const { id = uuid(), description, loggedAt } = action.payload;
    const user = yield select(state => state.getIn(['user']));
    const token = yield user.getIdToken();

    const variables = {
      token,
      id,
      description,
      loggedAt,
    };

    const query = mutation(variables);
    yield call(graphqlClient.mutate, query);

    // const activities = yield select(state => state.getIn(['activities']));
    // debugger;
    // yield localForage.setItem('activities', activities);
  } catch (err) {
    console.log(err);
  }
}

export default function* watchUpdateActivity(_firebase, graphqlClient) {
  yield takeLatest(actions.UPDATE_ACTIVITY, updateActivity, graphqlClient);
}
