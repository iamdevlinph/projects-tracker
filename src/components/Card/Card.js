import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import Badge from '../Badge/Badge';
import CardUtil from './CardUtil';

const CardComponent = (props) => {
  const { data, settings } = props;
  const statusColor = CardUtil.getStatusColor(data, settings);
  return (
    <CardChunk status={statusColor}>
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
        <Badge label="issues" data={data.issuesCount} repoUrl={data.repoUrl} settings={settings} />
      </IssuesArea>
      <PullArea>
        <Badge label="pull requests" data={data.prsCount} repoUrl={data.repoUrl} settings={settings} />
      </PullArea>
    </CardChunk>
  );
};

CardComponent.propTypes = {
  data: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default CardComponent;

const CardChunk = styled.div`
  font-size: 13px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(0, 0, 0, 0.24) 0px 1.5px 1px 0px;
  border-left: ${({ status }) => `5px solid ${status}`};
  display: grid;
  grid-template-columns: 40px 3fr 1fr 120px 120px;
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
  font-family: 'Roboto Mono', monospace;
  grid-area: commit;
`;
const IssuesArea = styled.div`
  grid-area: issues;
  line-height: 40px;
`;
const PullArea = styled.div`
  grid-area: pull;
  line-height: 40px;
`;
const BlueUrl = styled.a`
  color: #00a0f0;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const BlueDivider = styled.span`
  color: #00a0f0;
  font-size: 15px;
`;
