import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styled from 'styled-components';
import ProjectsTblUtil from './ProjectsTblUtil';
import Button from '../Button/Button';

class ProjectsTableComponent extends Component {
  viewRepo = (cellInfo) => {
    let link;
    switch (cellInfo.column.id) {
      case 'authorName':
        link = cellInfo.original.authorUrl;
        break;
      default:
        link = cellInfo.original.repoUrl;
    }

    return (
      <RepoLink href={link} target="blank">{cellInfo.value}</RepoLink>
    );
  }

  renderActions = (loggedIn, cellInfo) => {
    const projectKey = cellInfo.original.key;
    const { deleteProject } = this.props;
    return (
      <div>
        <Button disabled={!loggedIn} icon={<i className="fas fa-trash-alt" />} onClick={() => deleteProject(projectKey, cellInfo.original.fullName)} color="e60101" />
      </div>
    );
  };

  render() {
    const {
      className, options, data, loggedIn,
    } = this.props;
    const columns = [
      {
        Header: 'Author',
        accessor: 'authorName',
        id: 'authorName',
        resizable: false,
        Cell: this.viewRepo,
      },
      {
        Header: 'Repository',
        accessor: 'repoName',
        id: 'repoName',
        resizable: false,
        Cell: this.viewRepo,
      },
      {
        resizable: false,
        sortable: false,
        Cell: cellInfo => this.renderActions(loggedIn, cellInfo),
        width: 60,
        style: {
          textAlign: 'center',
        },
      },
    ];
    const makeOptions = ProjectsTblUtil.makeOptions(options);
    return (
      <ReactTable
        data={data}
        columns={columns}
        className={className}
        {...makeOptions}
      />
    );
  }
}

ProjectsTableComponent.propTypes = {
  className: PropTypes.string,
};

ProjectsTableComponent.defaultProps = {
  className: '-highlight',
};

export default ProjectsTableComponent;

const RepoLink = styled.a`
  color: black;
  transition: all 0.5s ease;
  text-decoration: none;
  &:hover {
    color: red;
    text-decoration: dashed;
  }
`;
