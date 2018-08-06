import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilterSearchComponent = (props) => {
  const { text } = props;
  return (
    <FilterSearch type="text" placeholder={text} />
  );
};

FilterSearchComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FilterSearchComponent;

const FilterSearch = styled.input`
  border: #348AA7 solid 1px;
  height: 32px;
  outline: white;
  padding-left: 5px;
`;
