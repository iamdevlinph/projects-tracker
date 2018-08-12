import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card, Filter } from '../../components';

class HomeContainer extends Component {
  render() {
    const { projects, settings } = this.props;
    const projectCards = (projects && settings) && projects.map((project) => {
      let el = null;
      el = (
        <Card key={project.key} data={project} settings={settings} />
      );
      return el;
    });
    let projectAreaDisplay;
    if (projects && settings) {
      projectAreaDisplay = projectCards.length > 0
        ? (
          <ProjectList>
            {projectCards}
          </ProjectList>
        )
        : (
          <ProjectEmptyList>
            No projects
          </ProjectEmptyList>
        );
    } else {
      projectAreaDisplay = (
        <div>
          Fetching projects
        </div>
      );
    }

    return (
      <HomeArea>
        <FilterArea>
          <Filter disabled={!(projects && settings)} />
        </FilterArea>
        <ProjectListArea>
          {projectAreaDisplay}
        </ProjectListArea>
      </HomeArea>
    );
  }
}

HomeContainer.propTypes = {
  projects: PropTypes.array,
  settings: PropTypes.object,
};

HomeContainer.defaultProps = {
  projects: null,
  settings: null,
};

export default HomeContainer;

const HomeArea = styled.div`
  display: grid;
  grid-template-rows: 2px 35px min-content;
  grid-template-areas:
    "home-top-pad"
    "filter"
    "list";
  row-gap: 10px;
`;
const ProjectList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  column-gap: 20px;
  row-gap: 10px;
`;
const ProjectEmptyList = styled.div`
  grid-area: list;
`;
const ProjectListArea = styled.div`
  grid-area: list;
`;
const FilterArea = styled.div`
  grid-area: filter;
`;
