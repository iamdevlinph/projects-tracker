import React from 'react';
import styled from 'styled-components';

import FilterButton from '../FilterButton/FilterButton';
import FilterSearch from '../FilterSearch/FilterSearch';

const FilterComponent = () => (
  <Filter>
    <FilterButton label="Authors" />
    <FilterButton label="Repositories" />
    <FilterButton label="Commit Date" />
    <FilterButton label="Issues" />
    <FilterButton label="Pull Requests" />
    <FilterSearch text="Search keyword" />
  </Filter>
);

export default FilterComponent;

/* eslint-disable react/destructuring-assignment */
const Filter = styled.div`
  font-size: 13px;
  /* background: #F5F5F5; */
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(0, 0, 0, 0.24) 0px 1.5px 1px 0px; */
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  grid-template-columns: repeat(6, max-content) 1fr;
  /* column-gap: 10px; */
  /* grid-template-areas: */
    /* "repo commit issues pull"; */
  /* height: 30px; */
`;
/* eslint-enable react/destructuring-assignment */
