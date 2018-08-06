import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonComponent = (props) => {
  const { label, icon, onClick } = props;
  return (
    <Button onClick={() => onClick()}>
      <ButtonContent>
        <span>
          {label}
        </span>
        {icon || null}
      </ButtonContent>
    </Button>
  );
};

ButtonComponent.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

ButtonComponent.defaultProps = {
  icon: null,
};

export default ButtonComponent;

// https://codepen.io/takeradi/pen/ZWExXr
const Button = styled.button`
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
  box-shadow: 0 5px 0px #487787;
  border-bottom: 1px solid #30809b;
  &:hover{
    background: #2E7A94;
    box-shadow: 0 4px 1px #487787;
    border-bottom: 2px solid #2a7088;
    transition: all 0.1s ease-in;
  }
  &:active{
    transform:translateY(2px);
    border-bottom-width: 4px;
    box-shadow: none;
  }
`;

const ButtonContent = styled.div`
    display: block;
    line-height: 6px;
    span {
      float: left;
    }
    i {
      float: right;
      line-height: 6px;
      margin-left: 5px;
    }
`;
