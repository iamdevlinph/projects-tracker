import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from '../../components';
import localStorage from '../../services/localStorage';
import LoginBanner from '../LoginBanner/LoginBanner';

class SettingsContainer extends Component {
  clearCache = (cacheName) => {
    localStorage.removeItem(cacheName);
  }

  render() {
    const {
      settings, requestLogin, requestLogOut, loggedIn, user,
    } = this.props;
    return (
      <div>
        <LoginBanner
          requestLogin={requestLogin}
          requestLogOut={requestLogOut}
          loggedIn={loggedIn}
          user={user}
        />
        <pre>
          {JSON.stringify(settings, null, 4)}
        </pre>
        <ButtonArea>
          Clear Cache
          <Button label="settingsCache" onClick={() => this.clearCache('settingsCache')} />
          <Button label="repoCache" onClick={() => this.clearCache('repoCache')} />
          <Button label="projectsCache" onClick={() => this.clearCache('projectsCache')} />
        </ButtonArea>
      </div>
    );
  }
}

SettingsContainer.propTypes = {
  settings: PropTypes.object,
  requestLogin: PropTypes.func.isRequired,
  requestLogOut: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  user: PropTypes.object,
};

SettingsContainer.defaultProps = {
  settings: null,
  loggedIn: false,
  user: null,
};

export default SettingsContainer;

const ButtonArea = styled.div`
  button {
    display: inline;
    margin: 0 5px;
  }
`;
