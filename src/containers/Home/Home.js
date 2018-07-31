import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { actions as projectsActions } from '../../sagaDucks/projects/projects';
import { Card } from '../../components';

class HomeContainer extends React.Component {
  componentWillMount() {
    const { requestList } = this.props;
    requestList();
  }

  render() {
    const { projects } = this.props;
    const projectCards = projects.map((project) => {
      let el = null;
      el = (
        <Card key={project.id}>
          {project.repoName}
        </Card>
      );
      return el;
    });
    return (
      <div>
        {projectCards.length > 1
          ? (
            <ProjectList>
              {projectCards}
            </ProjectList>
          ) : (
            <ProjectEmptyList>
              No projects
            </ProjectEmptyList>
          )
        }
      </div>
    );
  }
}

HomeContainer.propTypes = {
  requestList: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
};

const mapStateToProps = state => (
  {
    projects: state.projects.list,
  }
);

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...projectsActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,200px);
  column-gap: 20px;
  row-gap: 20px;
`;
const ProjectEmptyList = styled.div``;
