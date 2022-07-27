import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = (props) => {
  const { pagination, loadPrevPage, loadNextPage } = props;

  return (
    <Pagination>
      {pagination != null && pagination.has_prev_page === true && (
        <Pagination.Prev onClick={loadPrevPage} />
      )}
      {pagination != null && pagination.page_count !== 1 && (
        <Pagination.Item disabled>{pagination.current_page}</Pagination.Item>
      )}
      {pagination != null && pagination.has_next_page === true && (
        <Pagination.Next onClick={loadNextPage} />
      )}
    </Pagination>
  );
};

export default CustomPagination;
