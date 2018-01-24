import React from 'react';
import Wrapper from 'milflux/wrapper';
import Toolbar from './toolbar';

const Mapping = (props) => {

  const mapDispatchToProps = (dispatch) => {
    return {
      onClick: (payload) => {
        dispatch({
          type: 'REMOVE',
          payload,
        });
      }
    }
  };

  return (
    <Wrapper mapping={mapDispatchToProps}>
      <Toolbar {...props} />
    </Wrapper>
  )
}

export default Mapping;