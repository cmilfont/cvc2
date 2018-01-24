import { put, call, select, takeLatest } from 'redux-saga/effects';
import actions from 'api/actions';
import localForage from 'localforage';
import { getTodayActivities } from 'api/graphql/queries';

function* fetchActivities(graphqlClient) {
  try {
    // const indexedActivities = yield localForage.getItem('activities');
    // yield put({ type: actions.FETCH_OFFLINE_ACTIVITIES, payload: indexedActivities });
    const user = yield select(state => state.getIn(['user']));
    const token = yield user.getIdToken();
    const variables = {
      token,
    };
    const query = getTodayActivities(variables);
    const { data: { todayActivities }} = yield call(graphqlClient.query, query);
    // yield localForage.setItem('activities', todayActivities);
    debugger;
    yield put({ type: actions.FETCH_ONLINE_ACTIVITIES, payload: todayActivities });
  } catch (err) {
    console.log(err);
  }
}

export default function* watchFetchActivities(_firebase, graphqlClient) {
  yield takeLatest(actions.FETCH_TODAY_ACTIVITIES, fetchActivities, graphqlClient);
}