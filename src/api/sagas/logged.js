import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import actions from 'api/actions';
import { push } from 'react-router-redux';

function createSocketChannel(firebase) {

  return eventChannel(emit => {
    firebase.auth().onAuthStateChanged(user => emit(user || {}));
    return () => {};
  })
}

export default function* watchLoginUser(firebase) {
  const socketChannel = yield call(createSocketChannel, firebase);
  while (true) {
    const payload = yield take(socketChannel);
    if (payload.email) {
      yield put({ type: actions.LOGIN_USER_SUCCESSFUL, payload });
      yield put(push('/'));
    } else {
      yield put(push('/login'));
    }
    
  }
}
