import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LoginBanner from '../LoginBanner/LoginBanner';

class ManageContainer extends Component {
  render() {
    const {
      settings, requestLogin, requestLogOut, loggedIn, user,
    } = this.props;
    return (
      <ManageArea>
        <LoginBannerArea>
          <LoginBanner
            requestLogin={requestLogin}
            requestLogOut={requestLogOut}
            loggedIn={loggedIn}
            user={user}
          />
        </LoginBannerArea>
        <ManageSection>
          Manage Page here
          {console.error('Manage Page')}
          {console.error(settings)}
        </ManageSection>
      </ManageArea>
    );
  }
}

ManageContainer.propTypes = {
  settings: PropTypes.object,
  requestLogin: PropTypes.func.isRequired,
  requestLogOut: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  user: PropTypes.object,
};

ManageContainer.defaultProps = {
  settings: null,
  loggedIn: false,
  user: null,
};

export default ManageContainer;

const ManageArea = styled.div`
  display: grid;
  grid-template-rows: 2px 35px min-content;
  grid-template-areas:
    "manage-top-pad"
    "login-banner"
    "manage";
  row-gap: 10px;
`;
const LoginBannerArea = styled.div`
  grid-area: login-banner;
`;
const ManageSection = styled.div`
  grid-area: manage;
`;
