import React from 'react';
import moment from 'moment';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import Activities from './components/activities';

const activities = [
  {
    id: uuid(),
    kind: 'DRINK',
    color: '#D6D1B1',
    description: 'water',
    loggedAt: moment().subtract(5, 'hours').format('LT'),
  },
  {
    id: uuid(),
    kind: 'DRINK',
    color: '#D6D1B1',
    description: 'coffee',
    loggedAt: moment().subtract(4, 'hours').format('LT'),
  },
  {
    id: uuid(),
    kind: 'EAT',
    color: '#F0B67F',
    description: 'porkbelly pizza',
    loggedAt: moment().subtract(3, 'hours').format('LT'),
  },
  {
    id: uuid(),
    kind: 'DRINK',
    color: '#D6D1B1',
    description: 'coffee',
    loggedAt: moment().subtract(3, 'hours').format('LT'),
  },
  {
    id: uuid(),
    kind: 'WORKOUT',
    color: '#C7EFCF',
    description: 'hiit',
    loggedAt: moment().subtract(2, 'hours').format('LT'),
  },
  {
    id: uuid(),
    kind: 'READ',
    color: '#261C15',
    description: 'medium radar frontend https://medium.com/@milfont/radar-front-end-2018-51a185f4eb41',
    loggedAt: moment().subtract(1, 'hours').format('LT'),
  },
];

class App extends React.Component {

  static childContextTypes = {
    dispatch: PropTypes.func,
  }

  state = { activities: [] };

  getChildContext() {
    return {
      dispatch: this.dispatch
    }
  }

  dispatch = (action) => {
    debugger;
    switch (action.type) {
      case 'REMOVE':
        this.remove(action.payload);
        break;
      default:
        break;
    }
  }

  remove = (event) => {
    debugger;
    const id = event.target.dataset["id"];
    const newList = this.state.activities.filter(activity => activity.id !== id);
    this.setState({ activities: newList });
  }

  componentDidMount() {
    // fetch('/activities').then(result => result.json()).then(activities => {
    //   this.setState({ activities });
    // })
    this.setState({ activities });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Activities</h1>
        </header>
        <Activities activities={this.state.activities} />
      </div>
    );
  }
}

export default App;
