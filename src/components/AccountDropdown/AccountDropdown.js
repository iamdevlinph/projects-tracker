import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AccountDropdownComponent = (props) => {
  const {
    loggedIn, requestLogin, requestLogOut, user,
  } = props;
  const userIcon = loggedIn ? 'fas fa-user' : 'far fa-user';
  const action = loggedIn ? requestLogOut : requestLogin;
  const actionText = loggedIn ? 'Log Out' : 'Log In';
  const welcomeText = loggedIn ? `Hello ${user.displayName}` : 'Hello visitor';
  return (
    <Dropdown className="dropdown">
      <i className={userIcon} />
      <DropdownMenu className="dropdown-menu">
        <span>
          {welcomeText}
        </span>
        <AccountActionButton onClick={action}>
          {actionText}
        </AccountActionButton>
      </DropdownMenu>
    </Dropdown>

  );
};

AccountDropdownComponent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  requestLogin: PropTypes.func.isRequired,
  requestLogOut: PropTypes.func.isRequired,
  user: PropTypes.object,
};

AccountDropdownComponent.defaultProps = {
  user: null,
};

export default AccountDropdownComponent;

const Dropdown = styled.div`
  /* float: right; */
  position: relative;
  display: inline-block;
  cursor: pointer;
  &:hover .dropdown-menu {
    display: block;
  }
`;
const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 35px;
  right: -15px;
  background-color: #F9F9F9;
  min-width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  & * {
    color: black;
    padding: 5px 16px;
    text-decoration: none;
    display: block;
    &:hover {
      background-color: #F1F1F1;
    }
  }
`;
const AccountActionButton = styled.button`
  background: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  height: inherit;
  line-height: inherit;
  width: 100%;
  text-align: right;
  cursor: pointer;
`;
