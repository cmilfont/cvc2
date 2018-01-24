import React from 'react';
import Activity from './activity';

class Activities extends React.Component {

  render() {
    const { onRemove } = this.props;
    const list = this.props.activities.map(activity => (
      <Activity
        key={`activity-${activity.id}`}
        activity={activity}
      />
    ));

    return list;
  }
}

export default Activities;