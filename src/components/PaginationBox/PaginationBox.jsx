import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
const PaginationBox = ({ currentPage, count, onChangePage }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        shape="rounded"
        color="secondary"
        variant="outlined"
        page={currentPage}
        count={count}
        onChange={(event, pages) => {
          onChangePage(pages);
        }}
      />
    </div>
  );
};

export default PaginationBox;
