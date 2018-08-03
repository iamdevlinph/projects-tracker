import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class NavbarComponent extends Component {
  render() {
    return (
      <NavbarChunk>
        <BannerArea>
          Banner Here or Logo
        </BannerArea>
        <LinksArea>
          <Link to="/">
            Home
          </Link>
          <Link to="manage">
            Manage
          </Link>
        </LinksArea>
      </NavbarChunk>
    );
  }
}

export default NavbarComponent;

const NavbarChunk = styled.div`
  background: #ADE9DD;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 50px 100px;
  grid-template-areas:
    "banner empty links account ribbon";
`;
const BannerArea = styled.div`
  grid-area: banner;
`;
const LinksArea = styled.div`
  grid-area: links;
  text-align: right;
`;
