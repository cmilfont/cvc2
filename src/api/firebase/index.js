import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAwFULDzJxhy67MYf5tMTMD3ygQh2pZGks",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "biohacking-ca69d.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://biohacking-ca69d.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECt_ID || "biohacking-ca69d",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "biohacking-ca69d.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID || "730944460815"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.auth().useDeviceLanguage();

export const parseFirebaseAuthError = (error = {}) => {
  switch (error.code) {
    case 'auth/weak-password':
      return {
        field: 'PASSWORD',
        message: 'Sua senha deve ter no mínimo 6 caracteres',
      };
    case 'auth/wrong-password':
      return {
        field: 'PASSWORD',
        message: 'Senha incorreta',
      };
    case 'auth/user-not-found':
      return {
        field: 'EMAIL',
        message: 'O usuário não existe ou foi deletado',
      };
    case 'auth/invalid-email':
      return {
        field: 'EMAIL',
        message: 'Insira um endereço de e-mail válido',
      };
    case 'auth/email-already-in-use':
      return {
        field: 'EMAIL',
        message: 'Este e-mail já está cadastrado',
      };
    default:
      return {};
  }
};

export default firebaseApp;
