import { fork } from 'redux-saga/effects';

import watchLogin from 'api/sagas/login';
import watchLogged from 'api/sagas/logged';
import watchLogout from 'api/sagas/logout';
import watchCreateActivity from 'api/sagas/activities/create';
import watchFetchActivities from 'api/sagas/activities/fetch';
import watchUpdateActivity from 'api/sagas/activities/update';
import watchRemoveActivities from 'api/sagas/activities/remove';

import watchFetchKinds from 'api/sagas/kinds';

export default function* rootSaga(firebase, graphqlClient) {
  yield fork(watchLogin, firebase, graphqlClient);
  yield fork(watchLogged, firebase, graphqlClient);
  yield fork(watchLogout, firebase, graphqlClient);
  yield fork(watchCreateActivity, firebase, graphqlClient);
  yield fork(watchFetchActivities, firebase, graphqlClient);
  yield fork(watchUpdateActivity, firebase, graphqlClient);
  yield fork(watchRemoveActivities, firebase, graphqlClient);
  yield fork(watchFetchKinds, graphqlClient);
}
