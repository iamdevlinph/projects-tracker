import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

class CardComponent extends Component {
  render() {
    const { data } = this.props;
    return (
      <CardChunk>
        <AvatarArea>
          <img src={data.authorAvatar} alt="avatar" />
        </AvatarArea>
        <RepoArea>
          <RepoName>
            <BlueUrl href={data.authorUrl} target="blank">
              {data.authorName}
            </BlueUrl>
            <BlueDivider>
              /
            </BlueDivider>
            <BlueUrl href={data.repoUrl} bold target="blank">
              {data.repoName}
            </BlueUrl>
          </RepoName>
          <RepoDesc>
            <span>
              {data.description}
            </span>
          </RepoDesc>
        </RepoArea>
        <CommitArea>
          {moment(data.lastCommitDate).format('DD MMM YYYY')}
        </CommitArea>
        <IssuesArea>
          {`Issues ${data.issuesCount}`}
        </IssuesArea>
        <PullArea>
          {`Pr ${data.prsCount}`}
        </PullArea>
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
  font-size: 13px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(0, 0, 0, 0.24) 0px 1.5px 1px 0px;
  border-left: 3px solid blue;
  display: grid;
  grid-template-columns: 40px 3fr 1fr 1fr 1fr;
  column-gap: 10px;
  grid-template-areas:
    "avatar repo commit issues pull";
  height: 40px;
`;
const AvatarArea = styled.div`
  grid-area: avatar;
  text-align: center;
  img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    display: inline-block;
  }
  margin-left: 5px;
  &::before {
    content: ' ';
    vertical-align: middle;
    display: inline-block;
    height: 100%;
  }
`;
const RepoArea = styled.div`
  grid-area: repo;
  display: grid;
  grid-template-rows: min-content 11px;
  grid-template-areas:
    "reponame"
    "desc";
`;
const RepoName = styled.div`
  grid-area: reponame;
  font-size: 14px;
`;
const RepoDesc = styled.div`
  grid-area: desc;
  font-size: 11px;
`;
const CommitArea = styled.div`
  grid-area: commit;
`;
const IssuesArea = styled.div`
  grid-area: issues;
`;
const PullArea = styled.div`
  grid-area: pull;
`;
// const Avatar = styled.div`
//   grid-area: img;
//   img {
//     height: 50px;
//     width: auto;
//   }
// `;
// const Description = styled.div`
//   grid-area: desc;
// `;
// const Status = styled.div`
//   grid-area: status;
// `;
const BlueUrl = styled.a`
  color: #00a0f0;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};;
  text-decoration: none;
`;
const BlueDivider = styled.span`
  color: #00a0f0;
  font-size: 15px;
`;
/* eslint-enable react/destructuring-assignment */
