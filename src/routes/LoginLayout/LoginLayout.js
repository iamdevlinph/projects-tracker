import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { actions as authActions } from '../../sagaDucks/auth/auth';

class LoginLayout extends Component {
  componentWillMount() {
    const { initAuth } = this.props;
    initAuth();
  }

  render() {
    const { children, requestLogin, authenticated } = this.props;
    return (
      !authenticated
        ? (
          <LoginLayoutArea>
            <LoginArea>
              {React.Children.map(children, child => React.cloneElement(child, {
                requestLogin,
              }))}
            </LoginArea>
          </LoginLayoutArea>
        ) : (
          <Redirect to="/track" />
        )
    );
  }
}

LoginLayout.propTypes = {
  children: PropTypes.object.isRequired,
  requestLogin: PropTypes.func.isRequired,
  initAuth: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

LoginLayout.defaultProps = {
  authenticated: undefined,
};

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout);

const LoginLayoutArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "top"
    "login"
    "bottom";
  height: 100vh;
`;
const LoginArea = styled.div`
  grid-area: login;
  text-align: center;
`;
