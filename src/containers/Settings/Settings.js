import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import LoginBanner from '../LoginBanner/LoginBanner';
import { Card, SettingsCard } from '../../components';

class SettingsContainer extends Component {
  render() {
    const {
      settings, requestLogin, requestLogOut, loggedIn, user,
    } = this.props;
    const safeData = {
      authorAvatar: 'https://avatars2.githubusercontent.com/u/19337229?v=4',
      authorName: 'Author',
      authorUrl: '#',
      repoName: 'Repository',
      repoUrl: '#',
      description: 'Description',
      lastCommitDate: moment().format(),
      lastCommitMsgPlaceholder: 'Up to date',
      issuesCount: 1,
      prsCount: 1,
    };
    const warningData = {
      authorAvatar: 'https://avatars2.githubusercontent.com/u/19337229?v=4',
      authorName: 'Author',
      authorUrl: '#',
      repoName: 'Repository',
      repoUrl: '#',
      description: 'Description',
      lastCommitDate: moment().subtract(settings.updateWarningDays, 'd').format(),
      lastCommitMsgPlaceholder: `Updated ${settings.updateWarningDays} days ago`,
      issuesCount: settings.issueWarningCount,
      prsCount: settings.prWarningCount,
    };
    const dangerData = {
      authorAvatar: 'https://avatars2.githubusercontent.com/u/19337229?v=4',
      authorName: 'Author',
      authorUrl: '#',
      repoName: 'Repository',
      repoUrl: '#',
      description: 'Description',
      lastCommitDate: moment().subtract(settings.updateDangerDays, 'd').format(),
      lastCommitMsgPlaceholder: `Updated ${settings.updateDangerDays} days ago`,
      issuesCount: settings.issueDangerCount,
      prsCount: settings.prDangerCount,
    };
    return (
      <SettingsArea>
        <LoginBannerArea>
          <LoginBanner
            requestLogin={requestLogin}
            requestLogOut={requestLogOut}
            loggedIn={loggedIn}
            user={user}
          />
        </LoginBannerArea>
        <SettingsSection>
          <h3>
            Preview
          </h3>
          <PreviewArea>
            <span>
              Safe
            </span>
            <Card data={safeData} settings={settings} />
            <span>
              Warning
            </span>
            <Card data={warningData} settings={settings} />
            <span>
              Danger
            </span>
            <Card data={dangerData} settings={settings} />
          </PreviewArea>
          <OptionsArea>
            <SettingsCard label="Repo Update" />
            <SettingsCard label="Issues" />
            <SettingsCard label="Pull Requests" />
          </OptionsArea>
        </SettingsSection>
      </SettingsArea>
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

const SettingsArea = styled.div`
  display: grid;
  grid-template-rows: 2px 35px min-content;
  grid-template-areas:
    "settings-top-pad"
    "login-banner"
    "settings";
  row-gap: 10px;
`;
const LoginBannerArea = styled.div`
  grid-area: login-banner;
`;
const SettingsSection = styled.div`
  grid-area: settings;
`;
const PreviewArea = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 10px;
  grid-row-gap: 10px;
  margin-bottom: 20px;
  & > span{
    line-height: 36px;
  }
`;
const OptionsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
`;
