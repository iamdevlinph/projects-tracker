import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ProjectsTbl } from '../../components';

class ManageContainer extends Component {
  render() {
    const {
      projects, saveProject, loggedIn, deleteProject,
    } = this.props;
    return (
      <ManageArea>
        <AddProject>
          Add Project
        </AddProject>
        <ProjectsList>
          <ProjectsTbl
            data={projects}
            saveProject={saveProject}
            deleteProject={deleteProject}
            loggedIn={loggedIn}
          />
        </ProjectsList>
      </ManageArea>
    );
  }
}

ManageContainer.propTypes = {
  projects: PropTypes.array,
  saveProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
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
`;
const ProjectsList = styled.div`
  grid-area: project-list;
`;
const AddProject = styled.div`
  grid-area: add-project;
`;
