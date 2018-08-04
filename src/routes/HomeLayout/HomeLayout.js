import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Navbar } from '../../components';

const HomeLayout = (props) => {
  const { children } = props;
  return (
    <NoSidebarArea>
      <NavbarArea>
        <Navbar />
      </NavbarArea>
      <MainArea>
        {children}
      </MainArea>
    </NoSidebarArea>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default HomeLayout;

const NoSidebarArea = styled.div`
  display: grid;
  grid-template-rows: 5px 40px 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "pad"
    "navbar"
    "main";
  height: 100vh;
`;
const NavbarArea = styled.div`
  grid-area: navbar;
`;
const MainArea = styled.div`
  grid-area: main;
  background: #F5F5F5;
  padding: 0 10px;
`;
