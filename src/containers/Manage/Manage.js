import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ProjectsTbl, Button } from '../../components';

class ManageContainer extends Component {
  constructor() {
    super();
    this.state = {
      authorName: '',
      repoName: '',
    };
  }

  handleInputChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const {
      projects, loggedIn, deleteProject, saveProject,
    } = this.props;
    const options = {
      showPagination: false,
      pageSize: projects.length,
    };
    const { authorName, repoName } = this.state;
    return (
      <ManageArea>
        <AddProject>
          <h3>Add Repository</h3>
          <span>Author Name</span>
          <input
            type="text"
            onChange={e => this.handleInputChange(e, 'authorName')}
          />
          <span>Repository Name</span>
          <input
            type="text"
            onChange={e => this.handleInputChange(e, 'repoName')}
          />
          <Button
            onClick={() => saveProject(authorName, repoName)}
            label="Save"
            icon={<i className="fas fa-plus" />}
            color="08AF4C"
            disabled={authorName === '' || repoName === ''}
          />
        </AddProject>
        <ProjectsList>
          <ProjectsTbl
            data={projects}
            deleteProject={deleteProject}
            loggedIn={loggedIn}
            options={options}
          />
        </ProjectsList>
      </ManageArea>
    );
  }
}

ManageContainer.propTypes = {
  projects: PropTypes.array,
  deleteProject: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
};

ManageContainer.defaultProps = {
  projects: null,
  loggedIn: false,
};

export default ManageContainer;

const ManageArea = styled.div`
  display: grid;
  grid-template-rows: 2px min-content 5px;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
    "manage-top-pad manage-top-pad"
    "add-project project-list";
  row-gap: 10px;
  column-gap: 20px;
`;
const ProjectsList = styled.div`
  grid-area: project-list;
`;
const AddProject = styled.div`
  grid-area: add-project;
  display: grid;
  grid-template-rows: repeat(5, min-content);
  row-gap: 10px;
`;
