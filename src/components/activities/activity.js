import React from 'react';
import Toolbar from 'components/activities/toolbar';

class Activity extends React.Component {

  render() {
    const { activity: { id, description } } = this.props;
    return (
      <div>
        <div>
          {description}
        </div>
        <Toolbar id={id} buttonLabel="Excluir" />
      </div>
    ) 
  }
}

export default Activity;