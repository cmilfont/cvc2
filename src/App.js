import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
// import { combineReducers } from 'redux-immutable';
import createHistory from 'history/createBrowserHistory';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import blueGrey from 'material-ui/colors/blueGrey';

import {
  Theme, 
} from 'react-dashboard-mui/Components';

import reducers from 'api/reducers';
import sagas from 'api/sagas';
import firebase from 'api/firebase';
// import graphqlClient from 'api/graphql/client';

import LoginForm from 'components/login';
import Logged from 'components/logged';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: blue,
  },
  overrides: {
    MuiAppBar: {
      // colorPrimary: {
        //backgroundColor: blueGrey['A200'],
      // },
    },
  },
});

class App extends Component {
  componentWillMount() {
    this.history = createHistory();
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [
      routerMiddleware(this.history),
      sagaMiddleware,
    ];
    const combinedReducers = combineReducers(reducers);
    const composeEnhancers = composeWithDevTools({});
    const composed = composeEnhancers(applyMiddleware(...middlewares));
    this.store = createStore(combinedReducers, composed);
    sagaMiddleware.run(sagas, firebase);
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <Theme customTheme={theme}>
            <Switch>
              <Route key="login-cmp" path="/login" component={LoginForm} />
              <Route key="main-cmp" path="/" component={Logged} />
            </Switch>
          </Theme>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
