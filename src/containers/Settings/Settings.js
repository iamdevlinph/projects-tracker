import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { actions as settingsActions } from '../../sagaDucks/settings/settings';
import { Button } from '../../components';
import localStorage from '../../services/localStorage';

class SettingsContainer extends Component {
  componentWillMount() {
    const { requestSettings, settings } = this.props;
    if (!settings) {
      requestSettings();
    }
  }

  clearCache = (cacheName) => {
    localStorage.removeItem(cacheName);
  }

  render() {
    const { settings } = this.props;
    return (
      <div>
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
  requestSettings: PropTypes.func.isRequired,
  settings: PropTypes.object,
};

SettingsContainer.defaultProps = {
  settings: null,
};

const mapStateToProps = state => (
  {
    settings: state.settings.settings,
  }
);

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...settingsActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);

const ButtonArea = styled.div`
  button {
    display: inline;
    margin: 0 5px;
  }
`;
