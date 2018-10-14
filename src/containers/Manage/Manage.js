import React, { Component, Fragment } from 'react';
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

  handleKeyDown = (e) => {
    const { authorName, repoName } = this.state;
    const { saveProject } = this.props;
    if (e.which === 13 && !(authorName === '' || repoName === '')) {
      saveProject(authorName, repoName);
    }
  }

  render() {
    const {
      projects, loggedIn, deleteProject, saveProject, ajaxInProgress,
    } = this.props;
    const options = {
      showPagination: false,
      pageSize: projects ? projects.length : 10,
    };
    const { authorName, repoName } = this.state;
    return (
      <ManageArea>
        {projects
          ? (
            <Fragment>
              {ajaxInProgress > 0
                && (
                  <ManageLoader>
                    <Spinner className="lds-ring">
                      <div />
                      <div />
                    </Spinner>
                  </ManageLoader>
                )
              }
              <AddProject>
                <h3>Add Github Repository</h3>
                <span>Author Name</span>
                <input
                  type="text"
                  onChange={e => this.handleInputChange(e, 'authorName')}
                  onKeyUp={e => this.handleKeyDown(e)}
                />
                <span>Repository Name</span>
                <input
                  type="text"
                  onChange={e => this.handleInputChange(e, 'repoName')}
                  onKeyUp={e => this.handleKeyDown(e)}
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
            </Fragment>
          ) : (
            <div>
              Fetching projects
            </div>
          )
        }
      </ManageArea>
    );
  }
}

ManageContainer.propTypes = {
  projects: PropTypes.array,
  deleteProject: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  ajaxInProgress: PropTypes.number.isRequired,
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
const ManageLoader = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.41);
  z-index: 2;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
  grid-template-rows: 1fr min-content 1fr;
  grid-template-areas:
    "top top top"
    "left loader right"
    "bot bot bot";
`;
const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  grid-area: loader;
  cursor: wait;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid #AEEADE;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #AEEADE transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
