import React from 'react';

const Toolbar = ({ id, buttonLabel, onClick }) => {
  return (
    <div>
      <button data-id={id} onClick={onClick}>{buttonLabel}</button>
    </div>
  );
};

export default Toolbar;