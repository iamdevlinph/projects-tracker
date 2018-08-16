import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SettingsCardComponent = (props) => {
  const { label } = props;
  return (
    <SettingsCardArea>
      <h4>
        {label}
      </h4>
      <SettingsListArea>
        <div className="bold">
          Safe
        </div>
        <div>
          Color
        </div>
        <div className="bold">
          Warning
        </div>
        <div>
          Color
        </div>
        <div className="bold">
          Danger
        </div>
        <div>
          Color
        </div>
      </SettingsListArea>
    </SettingsCardArea>
  );
};

SettingsCardComponent.propTypes = {
  label: PropTypes.string.isRequired,
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
