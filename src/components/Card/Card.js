import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class CardComponent extends Component {
  render() {
    const { data } = this.props;
    return (
      <CardChunk>
        <Avatar>
          <img src={data.authorAvatar} alt="avatar" />
        </Avatar>
        <Description>
          {data.authorName}
          /
          {data.repoName}
          {' '}
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

const CardChunk = styled.div`
  background: grey;
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
