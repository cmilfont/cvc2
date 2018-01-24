import { put, call, select, takeLatest } from 'redux-saga/effects';
import actions from 'api/actions';
import localForage from 'localforage';
import { getTodayActivities, getKinds } from 'api/graphql/queries';

function* fetchKinds(graphqlClient) {
  try {
    const user = yield select(state => state.getIn(['user']));
    const token = yield user.getIdToken();
    const variables = {
      token,
    };

    const query = getKinds(variables);

    const { data: payload } = yield call(graphqlClient.query, query);

    yield put({ type: actions.FETCH_KINDS_SUCCESSFUL, payload });
    
  } catch (err) {
    console.log(err);
  }
}

export default function* watchFetchKinds(graphqlClient) {
  yield takeLatest(actions.FETCH_KINDS, fetchKinds, graphqlClient);
}