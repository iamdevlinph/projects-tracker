import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const githubUrl = authorName => `https://github.com/${authorName}`;
const repoUrl = (authorName, repoName) => `${githubUrl(authorName)}/${repoName}`;
class CardComponent extends Component {
  render() {
    const { data } = this.props;
    return (
      <CardChunk>
        <Avatar>
          <img src={data.authorAvatar} alt="avatar" />
        </Avatar>
        <Description>
          <BlueUrl href={githubUrl(data.authorName)}>
            {data.authorName}
          </BlueUrl>
          <BlueDivider>
            /
          </BlueDivider>
          <BlueUrl href={repoUrl(data.authorName, data.repoName)} bold>
            {data.repoName}
          </BlueUrl>
          {data.description}
        </Description>
        <Status>
          <img src={data.stars} alt="stars" />
          <img src={data.issues} alt="issues" />
          <img src={data.prsOpen} alt="pr" />
        </Status>
      </CardChunk>
    );
  }
}

CardComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CardComponent;

/* eslint-disable react/destructuring-assignment */
const CardChunk = styled.div`
  display: grid;
  grid-template-columns: 50px 3fr 1fr;
  grid-template-areas:
    "img desc status";
`;
const Avatar = styled.div`
  grid-area: img;
  img {
    height: 50px;
    width: auto;
  }
`;
const Description = styled.div`
  grid-area: desc;
`;
const Status = styled.div`
  grid-area: status;
`;
const BlueUrl = styled.a`
  color: #00a0f0;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};;
  text-decoration: none;
`;
const BlueDivider = styled.span`
  color: #00a0f0;
  font-size: 20px;
`;
/* eslint-enable react/destructuring-assignment */
