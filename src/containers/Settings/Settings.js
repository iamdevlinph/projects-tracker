import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card, SettingsCard, Button } from '../../components';
import SettingsUtil from './SettingsUtil';

class SettingsContainer extends Component {
  componentWillUnmount() {
    const { resetSettings } = this.props;
    resetSettings();
  }

  render() {
    const {
      settings, showColorPicker, activeColorPicker, loggedIn,
      previewColor, previewCount, resetSettings, saveSettings, user,
    } = this.props;
    const display = !settings
      ? (
        <div>
          Fetching stuff
        </div>
      ) : (
        <SettingsArea>
          <SettingsSection>
            <h3>
              Preview
            </h3>
            <PreviewArea>
              <span>
                Default
              </span>
              <Card
                data={SettingsUtil.generateDefaultData()}
                settings={settings}
                defaultAvatar={user.photoURL}
              />
              <span>
                Safe
              </span>
              <Card
                data={SettingsUtil.generateSafeData()}
                settings={settings}
                defaultAvatar={user.photoURL}
              />
              <span>
                Warning
              </span>
              <Card
                data={SettingsUtil.generateWarningData(settings)}
                settings={settings}
                defaultAvatar={user.photoURL}
              />
              <span>
                Danger
              </span>
              <Card
                data={SettingsUtil.generateDangerData(settings)}
                settings={settings}
                defaultAvatar={user.photoURL}
              />
            </PreviewArea>
            <OptionsArea>
              <SettingsCard
                label="Repo Update"
                settings={settings.update}
                showColorPicker={showColorPicker}
                activeColorPicker={activeColorPicker}
                previewColor={previewColor}
                previewCount={previewCount}
              />
              <SettingsCard
                label="Issues"
                settings={settings.issues}
                showColorPicker={showColorPicker}
                activeColorPicker={activeColorPicker}
                previewColor={previewColor}
                previewCount={previewCount}
              />
              <SettingsCard
                label="Pull Requests"
                settings={settings.pulls}
                showColorPicker={showColorPicker}
                activeColorPicker={activeColorPicker}
                previewColor={previewColor}
                previewCount={previewCount}
              />
            </OptionsArea>
            {loggedIn
              ? (
                <SettingsButtonsArea>
                  <Button label="Reset" onClick={() => resetSettings()} color="#f96616" withGap float="right" />
                  <Button label="Save" onClick={() => saveSettings(settings)} color="#08af4c" withGap float="right" />
                </SettingsButtonsArea>
              )
              : null}
          </SettingsSection>
        </SettingsArea>
      );
    return display;
  }
}

SettingsContainer.propTypes = {
  settings: PropTypes.object,
  showColorPicker: PropTypes.func.isRequired,
  previewColor: PropTypes.func.isRequired,
  activeColorPicker: PropTypes.string,
  previewCount: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

SettingsContainer.defaultProps = {
  settings: null,
  activeColorPicker: '',
};

export default SettingsContainer;

const SettingsArea = styled.div`
  display: grid;
  grid-template-rows: 2px min-content;
  grid-template-areas:
    "settings-top-pad"
    "settings";
  row-gap: 10px;
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
    font-weight: bold;
    font-size: 14px;
  }
`;
const OptionsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
`;
const SettingsButtonsArea = styled.div`
  display: flex;
  margin-top: 10px;
  float: right;
`;
