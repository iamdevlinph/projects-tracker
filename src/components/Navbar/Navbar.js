import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import AccountDropdown from '../AccountDropdown/AccountDropdown';

const NavbarComponent = props => (
  <NavbarChunk>
    <BannerArea>
      <h1>
        <a href="/track">
          Projects Tracker
        </a>
      </h1>
    </BannerArea>
    <LinksArea>
      <NavLink to="/track" activeClassName="active-link">
        Home
      </NavLink>
      {' | '}
      <NavLink to="/manage" activeClassName="active-link">
        Manage
      </NavLink>
      {' | '}
      <NavLink to="/settings" activeClassName="active-link">
        Settings
      </NavLink>
      {' | '}
      <AccountDropdown {...props} />
      {' | '}
      <a href="https://github.com/iamdevlinph/projects-tracker" target="blank" className="bold">
        Github
        {' '}
        <i className="fas fa-external-link-alt" />
      </a>
    </LinksArea>
  </NavbarChunk>
);

export default NavbarComponent;

const NavbarChunk = styled.div`
  background: #ADE9DD;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 20px;
  grid-template-areas:
    "banner links r-pad";
`;
const BannerArea = styled.div`
  grid-area: banner;
  h1 {
    margin: 0;
    font-size: 25px;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;
const LinksArea = styled.div`
  grid-area: links;
  text-align: right;
  font-size: 14px;
  line-height: 40px;
  a {
    color: black;
    text-decoration: none;
    &.active-link {
      text-decoration: underline;
    }
  }
`;
