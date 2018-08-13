import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilterSearchComponent = (props) => {
  const { text, disabled, searchList } = props;
  return (
    <FilterSearch disabled={disabled} type="text" placeholder={text} onKeyUp={e => searchList(e)} />
  );
};

FilterSearchComponent.propTypes = {
  text: PropTypes.string.isRequired,
  searchList: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default FilterSearchComponent;

const FilterSearch = styled.input`
  border: #348AA7 solid 1px;
  height: 32px;
  outline: white;
  padding-left: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'auto')}
`;
