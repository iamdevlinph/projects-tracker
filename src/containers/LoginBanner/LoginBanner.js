import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class LoginBannerComponent extends Component {
  render() {
    const {
      requestLogin, requestLogOut, loggedIn, user,
    } = this.props;
    const onClick = !loggedIn ? requestLogin : requestLogOut;
    return (
      <LoginBanner>
        <MessageArea>
          Hello
          {' '}
          {!loggedIn ? 'Visitor' : user.displayName}
        </MessageArea>
        <LoginButtonArea>
          <LoginButton onClick={onClick}>
            {!loggedIn ? 'Log In' : 'Log Out'}
          </LoginButton>
        </LoginButtonArea>
      </LoginBanner>
    );
  }
}

LoginBannerComponent.propTypes = {
  requestLogin: PropTypes.func.isRequired,
  requestLogOut: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  user: PropTypes.object,
};

LoginBannerComponent.defaultProps = {
  loggedIn: false,
  user: null,
};


export default LoginBannerComponent;

const LoginBanner = styled.div`
  display: grid;
  grid-template-columns: 2fr min-content;
  grid-template-areas:
    "message login-button";
  height: 100%;
  /* taken from bootstrap alert */
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
  position: relative;
  border: 1px solid transparent;
  border-radius: .25rem;
  & > * {
    padding: 7px;
  }
`;
const MessageArea = styled.div`
  grid-area: message;
`;
const LoginButtonArea = styled.div`
  grid-area: login-button;
`;
const LoginButton = styled.div`
  cursor: pointer;
  height: 100%;
  border: 1px solid white;
  padding: 5px;
  margin: -5px 0px;
  border-radius: .25rem;
  white-space: nowrap;
  &:hover {
    background: white;
  }
`;
