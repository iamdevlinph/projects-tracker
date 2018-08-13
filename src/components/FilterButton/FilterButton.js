import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

class FilterButtonComponent extends Component {
  render() {
    const {
      label, disabled, sortFunc, value, sort,
    } = this.props;
    const click = () => {
      const orderByAsc = sort.field === value ? !sort.isAsc : true;
      sortFunc(value, orderByAsc);
    };
    const asc = sort.isAsc ? 'fas fa-caret-up' : 'fas fa-caret-down';
    const caretDirection = sort.field === value ? asc : 'down';
    return (
      <Button
        onClick={click}
        label={label}
        icon={<i className={caretDirection} />}
        disabled={disabled}
      />
    );
  }
}

FilterButtonComponent.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  sortFunc: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  sort: PropTypes.object.isRequired,
};

export default FilterButtonComponent;
