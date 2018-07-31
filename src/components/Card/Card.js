import React from 'react';
import styled from 'styled-components';

class CardComponent extends React.Component {
  render() {
    return (
      <CardChunk>
        <Avatar>
          <img src="https://avatars1.githubusercontent.com/u/19337229?s=460&v=4" alt="avatar" />
        </Avatar>
        <Description>
          title. last updated. description
        </Description>
        <Status>
          Status of the project here
        </Status>
      </CardChunk>
    );
  }
}

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
