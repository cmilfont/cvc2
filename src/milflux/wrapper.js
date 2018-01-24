import React from 'react';
import PropTypes from 'prop-types';

class Wrapper extends React.Component {
  
  static contextTypes = {
    dispatch: PropTypes.func,
  }

  render() {
    const { dispatch } = this.context;
    const { children, mapping } = this.props;
    const newProps = mapping(dispatch);
    return React.cloneElement(children, newProps);
  }
}

export default Wrapper;