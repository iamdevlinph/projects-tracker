import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { actions as projectsActions } from '../../sagaDucks/projects/projects';
import { Card } from '../../components';

class HomeContainer extends React.Component {
  render() {
    const { requestList } = this.props;
    return (
      <div>
        Home here
        <button type="button" onClick={() => requestList()}>
          Request List
        </button>
        <ProjectList>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ProjectList>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  requestList: PropTypes.func.isRequired,
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
