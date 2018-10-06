import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ColorUtil } from 'common-utils-pkg';

const ButtonComponent = (props) => {
  const {
    label, icon, onClick, disabled, className, withGap,
  } = props;
  const validHexColor = (color) => {
    let returnColor = '#348AA7'; // default
    if (color !== '' && !/^#/g.test(color)) { // no hash
      returnColor = `#${color}`;
    } else if (color !== '' && color) { // use passed value
      returnColor = color;
    }

    return returnColor;
  };
  let { color } = props;
  color = validHexColor(color);
  const shadow = ColorUtil.brightness(color, -50);
  return (
    <ButtonHolder className={className} withGap={withGap}>
      <Button onClick={() => onClick()} disabled={disabled} color={color} shadow={shadow}>
        <ButtonContent>
          <span>
            {label}
          </span>
          {icon || null}
        </ButtonContent>
      </Button>
    </ButtonHolder>
  );
};

ButtonComponent.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  withGap: PropTypes.bool,
};

ButtonComponent.defaultProps = {
  disabled: false,
  color: '#348AA7',
  icon: null,
  className: '',
  withGap: false,
};

export default ButtonComponent;

// https://codepen.io/takeradi/pen/ZWExXr
const Button = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: block;
  padding: 15px;
  height: 30px;
  background: ${({ disabled, color }) => (disabled ? 'grey' : color)};
  border: none;
  outline: none;
  color: white;
  font-weight: 400;
  font-size: 15px;
  box-shadow: ${({ disabled, shadow }) => (disabled ? '0 5px 0px #676767' : `0 5px 0px ${shadow}`)};
  border-bottom: ${({ disabled, color }) => (disabled ? '1px solid #676767' : `1px solid ${color}`)};
  ${({ disabled, shadow }) => !disabled && `
    &:hover{
      background: ${shadow};
      box-shadow: 0 4px 1px ${shadow};
      border-bottom: 1px solid ${shadow};
      transition: all 0.1s ease-in;
    }
    &:active{
      transform:translateY(2px);
      border-bottom-width: 4px;
      box-shadow: none;
    }
  `}
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
const ButtonHolder = styled.div`
  height: 30px;
  display: inline-block;
  margin: ${({ withGap }) => (withGap ? '0 2px' : '')};
`;
