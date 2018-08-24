import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class ManageContainer extends Component {
  render() {
    const { settings } = this.props;
    return (
      <ManageArea>
        <ManageSection>
          <h3>
            Manage
          </h3>
          {console.error('Manage Page')}
          {console.error(settings)}
        </ManageSection>
      </ManageArea>
    );
  }
}

ManageContainer.propTypes = {
  settings: PropTypes.object,
};

ManageContainer.defaultProps = {
  settings: null,
};

export default ManageContainer;

const ManageArea = styled.div`
  display: grid;
  grid-template-rows: 2px min-content;
  grid-template-areas:
    "manage-top-pad"
    "manage";
  row-gap: 10px;
`;
const ManageSection = styled.div`
  grid-area: manage;
`;
