import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Navbar, Filter } from '../../components';

class HomeLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <NavbarArea>
          <Navbar />
        </NavbarArea>
        <FilterArea>
          <Filter />
        </FilterArea>
        <MainArea>
          {children}
        </MainArea>
      </Layout>
    );
  }
}

HomeLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default HomeLayout;

const Layout = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    "navbar navbar"
    "filter main";
  height: 100vh;
`;

const NavbarArea = styled.div`
  grid-area: navbar;
`;
const MainArea = styled.div`
  grid-area: main;
  background: #D7E0B1;
`;
const FilterArea = styled.div`
  grid-area: filter;
  background: #C686AB;
`;
