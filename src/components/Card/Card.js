import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import Badge from '../Badge/Badge';
import CardUtil from './CardUtil';

const CardComponent = (props) => {
  const {
    data, settings, defaultAvatar, fromSettingsPage,
  } = props;
  const statusColor = CardUtil.getStatusColor(data, settings);
  const allowUrlClick = url => url !== '#';
  return (
    <CardChunk status={statusColor}>
      <AvatarArea>
        <img src={defaultAvatar || data.authorAvatar} alt="avatar" />
      </AvatarArea>
      <RepoArea>
        <RepoName>
          <BlueUrl href={data.authorUrl} target="blank" allowClick={allowUrlClick(data.authorUrl)}>
            {data.authorName}
          </BlueUrl>
          <BlueDivider>
            /
          </BlueDivider>
          <BlueUrl href={data.repoUrl} bold target="blank" allowClick={allowUrlClick(data.repoUrl)}>
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
        <div>{data.lastCommitMsgPlaceholder ? data.lastCommitMsgPlaceholder : moment(data.updatedAt).format('DD MMM YYYY')}</div>
        {!fromSettingsPage && (
          <div className="commit-days-ago">
            {CardUtil.daysAgo(moment(data.updatedAt))}
          </div>
        )}
      </CommitArea>
      <IssuesArea>
        <Badge label="issues" data={data.issuesCount} repoUrl={data.repoUrl} settings={settings.issues} />
      </IssuesArea>
      <PullArea>
        <Badge label="pull requests" data={data.prsCount} repoUrl={data.repoUrl} settings={settings.pulls} />
      </PullArea>
    </CardChunk>
  );
};

CardComponent.propTypes = {
  data: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  defaultAvatar: PropTypes.string,
  fromSettingsPage: PropTypes.bool,
};

CardComponent.defaultProps = {
  defaultAvatar: '',
  fromSettingsPage: false,
};

export default CardComponent;

const CardChunk = styled.div`
  font-size: 13px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(0, 0, 0, 0.24) 0px 1.5px 1px 0px;
  border-left: ${({ status }) => `5px solid ${status}`};
  display: grid;
  grid-template-columns: 40px 3fr max-content 120px 120px;
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
  display: grid;
  grid-template-rows: 1fr 1fr;
  text-align: center;
  .commit-days-ago {
    font-size: 9px;
  }
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
  color: #00A0F0;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  text-decoration: none;
  pointer-events: ${({ allowClick }) => (allowClick ? 'auto' : 'none')};
  &:hover {
    text-decoration: underline;
  }
`;
const BlueDivider = styled.span`
  color: #00A0F0;
  font-size: 15px;
`;
