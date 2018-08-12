import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const FilterButtonComponent = (props) => {
  const { label, disabled } = props;
  const click = () => {
    console.error('This doesn\'t work right now.');
  };
  return (
    <Button onClick={click} label={label} icon={<i className="fas fa-caret-down" />} disabled={disabled} />
  );
};

FilterButtonComponent.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default FilterButtonComponent;
