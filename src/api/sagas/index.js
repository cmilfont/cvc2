import { fork } from 'redux-saga/effects';

// import watchLogin from 'api/sagas/login';
import watchLogged from 'api/sagas/logged';
// import watchLogout from 'api/sagas/logout';

export default function* rootSaga(firebase) {

  // yield fork(watchLogin, firebase);
  yield fork(watchLogged, firebase);
  // yield fork(watchLogout, firebase);

}