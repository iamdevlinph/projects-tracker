const makeOptions = (options) => {
  const defaultOptions = {
    minRows: 10,
    defaultPageSize: 10,
    noDataText: 'No data found',
  };
  return {
    ...defaultOptions,
    ...options,
  };
};

const ProjectsTblUtils = {
  makeOptions,
};

export default ProjectsTblUtils;
