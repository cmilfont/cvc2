import React from 'react';
import { connect } from 'react-redux';
import ListSubheader from 'material-ui/List/ListSubheader';
import Activity from './activity';
import EditActivity from './editActivity';

import actions from 'api/actions';

class List extends React.Component {
  componentDidMount() {
    this.props.fetchTodayActivities();
  }

  render() {
    const { activities, activity } = this.props;
    const list = activities.map(activityItem => activityItem.id === activity.id 
      ? <EditActivity key={`activity-${activityItem.id}`} {...activityItem} />
      : <Activity key={`activity-${activityItem.id}`} {...activityItem} />
    );
    return (
      <div>
        <ListSubheader>{`Today`}</ListSubheader>
        {list}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.get('activities'),
  activity: state.get('activity'),
});

const mapDispatchToProps = dispatch => ({
  fetchTodayActivities: () => dispatch({
    type: actions.FETCH_TODAY_ACTIVITIES,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(List);
