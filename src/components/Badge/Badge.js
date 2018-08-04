import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BadgeComponent = (props) => {
  const { label, data, repoUrl } = props;
  let url = repoUrl;
  url += label === 'pull requests' ? '/pulls' : '/issues';
  return (
    <Badge href={url} target="blank">
      <Label>
        {label}
      </Label>
      <Number>
        {data}
      </Number>
    </Badge>
  );
};

BadgeComponent.propTypes = {
  data: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
};

export default BadgeComponent;

const Badge = styled.a`
  display: grid;
  grid-template-columns: 1fr 25px;
  grid-template-areas:
    "label number";
  text-decoration: none;
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
  background: #44CC12;
  color: white;
  padding: 0 5px;
`;
