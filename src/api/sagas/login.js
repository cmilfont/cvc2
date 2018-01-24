import firebase from 'firebase';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from 'api/actions';
import { loginMutation as mutation } from 'api/graphql/mutations';


function* loginUser(firebaseApp, graphqlClient) {
  try {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    authProvider.addScope('profile');
    authProvider.addScope('email');
    authProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const { user: payload } = yield firebaseApp.auth().signInWithPopup(authProvider);
    const { displayName, photoURL, email, uid, pa: token } = payload;
    const ref =  yield firebaseApp.database().ref(`/users/${uid}`);
    yield ref.update({ displayName, photoURL, email });
    
    const query = mutation({token});
    yield call(graphqlClient.mutate, query);

    // yield put({ type: actions.LOGIN_USER_SUCCESSFUL, payload });
    // yield put(push('/'));

  } catch (err) {
    console.log(err);
    yield put({ type: actions.LOGIN_USER_FAILED, payload: err });
  }
}

export default function* watchLogin(firebaseApp, graphqlClient) {
  yield takeLatest(actions.LOGIN_USER, loginUser, firebaseApp, graphqlClient);
}