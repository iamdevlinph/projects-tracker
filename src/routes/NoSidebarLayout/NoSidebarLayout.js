import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Navbar } from '../../components';

const NoSidebarLayout = (props) => {
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

NoSidebarLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default NoSidebarLayout;

const NoSidebarArea = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "navbar navbar"
    "main main";
  height: 100vh;
`;
const NavbarArea = styled.div`
  grid-area: navbar;
`;
const MainArea = styled.div`
  grid-area: main;
`;
