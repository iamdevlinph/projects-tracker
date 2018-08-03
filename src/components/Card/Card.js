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
          {data.descriptiono}
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
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 50px 2fr;
  grid-template-areas:
    "img desc"
    "status status";
`;
const Avatar = styled.div`
  grid-area: img;
  img {
    height: auto;
    width: 100%;
  }
`;
const Description = styled.div`
  grid-area: desc;
`;
const Status = styled.div`
  grid-area: status;
`;
