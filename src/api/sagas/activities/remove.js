import { call, select, takeLatest } from 'redux-saga/effects';
import actions from 'api/actions';
import localForage from 'localforage';
import { deleteActivityMutation as mutation } from 'api/graphql/mutations';

function* removeActivity(graphqlClient, action) {
  try {
    const { id, description, loggedAt } = action.payload;
    const user = yield select(state => state.getIn(['user']));
    const token = yield user.getIdToken();

    const variables = {
      id,
      token,
    };
    
    const query = mutation(variables);
    yield call(graphqlClient.mutate, query);

    // const activities = yield select(state => state.getIn(['activities']));
    // yield localForage.setItem('activities', activities);
  } catch (err) {
    console.log(err);
  }
}

export default function* watchRemoveActivity(_firebase, graphqlClient) {
  yield takeLatest(actions.REMOVE_ACTIVITY, removeActivity, graphqlClient);
}