import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Navbar } from '../../components';

const Layout = styled.div`
  /* display: inherit;
  text-align: center; */
`;

class HomeLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <Navbar />
        {children}
      </Layout>
    );
  }
}

HomeLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default HomeLayout;
