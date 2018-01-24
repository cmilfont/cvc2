import { put, call, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import localForage from 'localforage';
import { updateActivityMutation as mutation } from 'api/graphql/mutations';
import uuid from 'uuid/v4';

function* createActivity(graphqlClient, action) {
  try {
    const { id = uuid(), kind, description, loggedAt } = action.payload;
    const user = yield select(state => state.getIn(['user']));
    const token = yield user.getIdToken();
    
    const variables = {
      id,
      KindId: kind.id,
      description,
      loggedAt,
      token,
    };
  
    const query = mutation(variables);
    yield call(graphqlClient.mutate, query);
  
    // const activities = yield select(state => state.getIn(['activities']));
    // debugger;
    // yield localForage.setItem('activities', activities);
    yield put(push('/'));
  } catch (err) {
    console.log(err);
  }
}

export default function* watchCreateActivity(_firebase, graphqlClient) {
  yield takeLatest(actions.CREATE_ACTIVITY, createActivity, graphqlClient);
}