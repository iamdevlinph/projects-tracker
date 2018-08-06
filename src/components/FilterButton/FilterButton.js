import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilterButtonComponent = (props) => {
  const { label } = props;
  const click = () => {
    console.log('This doesn\'t work right now.');
  };
  return (
    <FilterButton onClick={() => click()}>
      <span>
        {label}
      </span>
      <i className="fas fa-caret-down" />
    </FilterButton>
  );
};

FilterButtonComponent.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FilterButtonComponent;

// https://codepen.io/takeradi/pen/ZWExXr
const FilterButton = styled.button`
  /* display: inline-block;
  padding: 0px 10px;
  height: 30px; */
  /* min-width: 100px; */
  /* background: #348AA7;
  border: none;
  outline: none;
  color: white;
  font-family: inherit;
  font-weight: 400;
  font-size: 15px;
  border-radius: 3px;
  box-shadow: 0 5px 0px #348AA7;
  border-bottom: 2px solid darken(#348AA7,3%);
  border-right: 1px solid #7B9FAC; */
  cursor: pointer;

  display: block;
  padding: 15px;
  height: 30px;
  background: #348AA7;
  border: none;
  outline: none;
  color: white;
  font-weight: 400;
  font-size: 15px;
  /* border-radius: 3px;s */
  box-shadow: 0 5px 0px #348aa7;
  border-bottom: 1px solid #30809b;

  &:hover{
    background: #2E7A94;
    box-shadow: 0 4px 1px #2E7A94;
    border-bottom: 2px solid #2a7088;
    transition: all 0.1s ease-in;
  }

  &:active{
    transform:translateY(2px);
    border-bottom-width: 4px;
    box-shadow: none;

  }
  span, i {
    display: block;
    float: left;
    line-height: 6px;
  }
  span {
    margin-right: 5px;
  }
`;
