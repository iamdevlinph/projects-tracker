import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const FilterButtonComponent = (props) => {
  const { label } = props;
  const click = () => {
    console.log('This doesn\'t work right now.');
  };
  return (
    <Button onClick={click} label={label} icon={<i className="fas fa-caret-down" />} />
  );
};

FilterButtonComponent.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FilterButtonComponent;
