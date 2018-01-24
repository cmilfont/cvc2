import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import {
  Dashboard,
  FixedAppbar,
  Main,
} from 'react-dashboard-mui/Components';
import Toolbar from 'components/toolbar';
import CreateActivity from 'components/activities/create';
import Activities from 'components/activities/list';

class Logged extends React.Component {

  render() {
    const { user } = this.props;
    if (!user.email) {
      return null;
    }

    return (
      <Dashboard>
        <FixedAppbar>
          <Toolbar />
        </FixedAppbar>
        <Main>
          <Switch>
            <Route key="new-cmp" path="/new" component={CreateActivity} />
            <Route key="chart-cmp" path="/charts" component={() => (<div>Charts</div>)} />
            <Route key="list-cmp" path="/" component={Activities} />
          </Switch>
        </Main>
      </Dashboard>
    );
  }
};

const mapStateToProps = state => ({ user: state.get('user') });

export default withRouter(connect(mapStateToProps)(Logged));
