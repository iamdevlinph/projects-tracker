import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { actions as projectsActions } from '../../sagaDucks/projects/projects';
import { actions as settingsActions } from '../../sagaDucks/settings/settings';
import { Card, Filter } from '../../components';

class HomeContainer extends Component {
  componentWillMount() {
    const { requestList, requestSettings } = this.props;
    requestList();
    requestSettings();
  }

  render() {
    const { projects, settings } = this.props;
    const projectCards = projects && projects.map((project) => {
      let el = null;
      el = (
        <Card key={project.key} data={project} settings={settings} />
      );
      return el;
    });
    let projectAreaDisplay;
    if (projects) {
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
          <Filter />
        </FilterArea>
        <ProjectListArea>
          {projectAreaDisplay}
        </ProjectListArea>
      </HomeArea>
    );
  }
}

HomeContainer.propTypes = {
  requestList: PropTypes.func.isRequired,
  requestSettings: PropTypes.func.isRequired,
  projects: PropTypes.array,
  settings: PropTypes.object.isRequired,
};

HomeContainer.defaultProps = {
  projects: null,
};

const mapStateToProps = state => (
  {
    projects: state.projects.list,
    settings: state.settings.settings,
  }
);

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...projectsActions,
    ...settingsActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

const HomeArea = styled.div`
  display: grid;
  grid-template-rows: 2px 30px min-content;
  grid-template-areas:
    "home-tap-pad"
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
