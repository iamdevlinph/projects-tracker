import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BadgeUtil from './BadgeUtil';

const BadgeComponent = (props) => {
  const {
    label, data, repoUrl, settings,
  } = props;
  let url = repoUrl;
  url += label === 'pull requests' ? '/pulls' : '/issues';
  const type = label === 'pull requests' ? 'pulls' : 'issues';
  const badgeColor = BadgeUtil.getBadgeColor(data, settings, type);
  return (
    <Badge href={url} target="blank">
      <Label>
        {label}
      </Label>
      <Number color={badgeColor}>
        {data}
      </Number>
    </Badge>
  );
};

BadgeComponent.propTypes = {
  data: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
};

export default BadgeComponent;

const Badge = styled.a`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    "label number";
  text-decoration: none;
  pointer-events: ${({ href }) => (href.includes('#') ? 'none' : 'auto')}
`;
const Label = styled.div`
  grid-area: label;
  letter-spacing: -1px;
  text-align: center;
  background: #555555;
  color: white;
`;
const Number = styled.div`
  grid-area: number;
  text-align: center;
  background: ${({ color }) => `${color}`};
  color: white;
`;
