import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import FilterButton from '../FilterButton/FilterButton';
import FilterSearch from '../FilterSearch/FilterSearch';

const FilterComponent = (props) => {
  const {
    disabled, sortFunc, sort, searchList,
  } = props;
  return (
    <Filter>
      <FilterButton label="Authors" value="authorName" disabled={disabled} sortFunc={sortFunc} sort={sort} />
      <FilterButton label="Repositories" value="repoName" disabled={disabled} sortFunc={sortFunc} sort={sort} />
      <FilterButton label="Commit Date" value="lastCommitDate" disabled={disabled} sortFunc={sortFunc} sort={sort} />
      <FilterButton label="Issues" value="issuesCount" disabled={disabled} sortFunc={sortFunc} sort={sort} />
      <FilterButton label="Pull Requests" value="prsCount" disabled={disabled} sortFunc={sortFunc} sort={sort} />
      <FilterSearch text="Search keyword" searchList={searchList} />
    </Filter>
  );
};

FilterComponent.propTypes = {
  disabled: PropTypes.bool.isRequired,
  sortFunc: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  searchList: PropTypes.func.isRequired,
};

export default FilterComponent;

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
