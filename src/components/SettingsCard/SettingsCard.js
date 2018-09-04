import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ColorPicker from '../ColorPicker/ColorPicker';

const SettingsCardComponent = (props) => {
  const { label, settings, previewCount } = props;
  const counterLabel = label.toLowerCase() !== 'repo update' ? 'Counts' : 'Days';
  return (
    <SettingsCardArea>
      <h4>
        {label}
      </h4>
      <SettingsListArea>
        <div className="bold">
          Safe
        </div>
        <OptionsArea>
          <ColorPicker color={settings.safeColor} id={`${label}-safe`} {...props} />
        </OptionsArea>
        <div className="bold">
          Warning
        </div>
        <OptionsArea>
          <ColorPicker color={settings.warningColor} id={`${label}-warning`} {...props} />
          <div>
            {`${counterLabel}: `}
            <CountInput type="number" value={settings.warningCount} onChange={e => previewCount(`${label}-warning`, e.target.value)} min="2" />
          </div>
        </OptionsArea>
        <div className="bold">
          Danger
        </div>
        <OptionsArea>
          <ColorPicker color={settings.dangerColor} id={`${label}-danger`} {...props} />
          <div>
            {`${counterLabel}: `}
            <CountInput type="number" value={settings.dangerCount} onChange={e => previewCount(`${label}-danger`, e.target.value)} min={settings.warningCount + 1} />
          </div>
        </OptionsArea>
      </SettingsListArea>
    </SettingsCardArea>
  );
};

SettingsCardComponent.propTypes = {
  label: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
};

export default SettingsCardComponent;

const SettingsCardArea = styled.div`
  background: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(0, 0, 0, 0.24) 0px 1.5px 1px 0px;
  padding: 0 10px 10px;
`;
const SettingsListArea = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 10px;
  font-size: 14px;
  .bold {
    font-weight: bold;
  }
`;
const OptionsArea = styled.div`
  display: grid;
  grid-template-columns: 40px 100px 1fr;
`;
const CountInput = styled.input`
  width: 60px;
  text-align: center;
`;
