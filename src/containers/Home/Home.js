import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { actions as projectsActions } from '../../sagaDucks/projects/projects';
import { Card, Filter } from '../../components';

class HomeContainer extends Component {
  componentWillMount() {
    const { requestList } = this.props;
    requestList();
  }

  render() {
    const { projects } = this.props;
    const projectCards = projects.map((project) => {
      let el = null;
      el = (
        <Card key={project.key} data={project} />
      );
      return el;
    });
    return (
      <HomeArea>
        <FilterArea>
          <Filter />
        </FilterArea>
        <ProjectListArea>
          {projectCards.length > 0
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
        </ProjectListArea>
      </HomeArea>
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

const HomeArea = styled.div``;
const ProjectList = styled.div`
  display: grid;
  grid-template-rows: repeat(50px);
  column-gap: 20px;
  row-gap: 20px;
`;
const ProjectEmptyList = styled.div``;
const ProjectListArea = styled.div``;
const FilterArea = styled.div``;
