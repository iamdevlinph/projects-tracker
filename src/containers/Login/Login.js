import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SignInGoogle = require('./img/signin-google.svg');

const LoginContainer = (props) => {
  const { requestLogin } = props;
  return (
    <LoginContainerArea>
      <h2>Github Projects Tracker</h2>
      <SigninArea>
        <span>Sign In:</span>
        <input
          type="image"
          className="signin signin-google-img"
          src={SignInGoogle}
          alt="Sign in with Google"
          title="Sign in with Google"
          onClick={() => requestLogin()}
        />
      </SigninArea>
    </LoginContainerArea>
  );
};

LoginContainer.propTypes = {
  requestLogin: PropTypes.func.isRequired,
};

export default LoginContainer;

const LoginContainerArea = styled.div`
  display: inline-block;
`;
const SigninArea = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  column-gap: 15px;
  span {
    line-height: 40px;
  }
  .signin {
    cursor: pointer;
    box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.2)
  }
`;
