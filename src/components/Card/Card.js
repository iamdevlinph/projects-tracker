import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class CardComponent extends Component {
  render() {
    const { children } = this.props;
    return (
      <CardChunk>
        <Avatar>
          <img src="https://avatars1.githubusercontent.com/u/19337229?s=460&v=4" alt="avatar" />
        </Avatar>
        <Description>
          {children}
        </Description>
        <Status>
          Status of the project here
        </Status>
      </CardChunk>
    );
  }
}

CardComponent.propTypes = {
  children: PropTypes.string.isRequired,
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
