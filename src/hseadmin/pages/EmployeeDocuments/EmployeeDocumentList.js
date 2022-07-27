import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadEmployeeDocuments } from '../../store/actions/employee_documents';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import CustomPagination from '../../components/CustomPagination';
import CustomSearchComponent from '../../components/CustomSearchComponent';

const EmployeeDocumentList = () => {
  // const {id: employeeId} = useParams();
  // const {id: documentId} = useParams();
  const dispatch = useDispatch();

  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      fetchEmployeeDocumentList();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  // eslint-disable-next-line camelcase
  const employeeDocuments = useSelector(
    (state) => state.employeeDocumentReducer.employeeDocuments
  );
  const pagination = useSelector(
    (state) => state.employeeDocumentReducer.pagination
  );
  // const employees = useSelector((state) => state.employee.employees);

  useEffect(() => {
    // fetchEmployeeDocumentList();
  }, []);

  const fetchEmployeeDocumentList = async () => {
    try {
      await dispatch(loadEmployeeDocuments(1, searchText, sort, direction));
    } catch (e) {
      // console.log(e);
    }
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);

    try {
      await dispatch(
        loadEmployeeDocuments(page + 1, searchText, sort, direction)
      );
      // await dispatch(loadCertificates(page + 1, searchText, sort, direction));
    } catch (e) {
      // console.log(e);
    }
  };

  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    try {
      // setLoading(true);
      await dispatch(
        loadEmployeeDocuments(page - 1, searchText, sort, direction)
      );
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      // console.log(e);
    }
  };

  const renderTable = () => {
    // eslint-disable-next-line camelcase,no-undef
    return employeeDocuments.map((employeeDocument) => {
      return (
        <tr key={employeeDocument.id}>
          <td>{employeeDocument.id}</td>
          <td>{employeeDocument.name}</td>
          <td>{employeeDocument.file_name}</td>
          <td>{employeeDocument.mime_type}</td>
          <td>{employeeDocument.extension}</td>
          <td>{employeeDocument.size}</td>
          <td>{employeeDocument.path}</td>
          <td>{employeeDocument.url}</td>
          <td>{employeeDocument.document_status_id}</td>
          <td>
            <Link to={`/documents/view/${employeeDocument.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    // console.log('inside useeffect');
    // fetchEmployeeDocumentList();
  }, [sort, direction]);

  const onArrowClickHandler = (title) => {
    setSort(title);
    if (direction === 'asc') {
      setDirection('desc');
    } else {
      setDirection('asc');
    }
  };

  const renderHeaderTitle = (title, sortName) => {
    let arrow = '';

    if (sort === sortName) {
      if (direction === 'asc') {
        arrow = <span>&#8593;</span>;
      } else {
        arrow = <span>&#8595;</span>;
      }
    } else {
      arrow = '';
    }

    return (
      <>
        <>
          {title}
          {arrow}
        </>
      </>
    );
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            List of Employee Documents
            <NavLink to="/employeeDocuments/add">
              <Button
                className="btn-md"
                variant="primary"
                type="button"
                style={{ float: 'right', marginRight: '10px' }}
              >
                Add Employee Documents
              </Button>
            </NavLink>
          </Card.Header>
          <Card.Body>
            <CustomPagination
              pagination={pagination}
              loadPrevPage={loadPrevPage}
              loadNextPage={loadNextPage}
            />

            <CustomSearchComponent onSearch={onSearchTextChangeHandler} />
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('ID', 'id')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(' Name', 'name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('file_name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('File Name', 'file_name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('mime_type')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Mime Type', 'mime_type')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('extension')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Extension', 'extension')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('size')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Size', 'size')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('path')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Path', 'path')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('url')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Url', 'url')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() =>
                          onArrowClickHandler('document_status_id')
                        }
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Document_status_id',
                          'document_status_id'
                        )}
                      </span>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>{renderTable()}</tbody>
              </Table>
            </div>

            <CustomPagination
              pagination={pagination}
              loadPrevPage={loadPrevPage}
              loadNextPage={loadNextPage}
            />
            {/* <Pagination> */}
            {/*    {(pagination != null && pagination.has_prev_page === true) && */}
            {/*        <Pagination.Prev onClick={loadPrevPage}/>} */}
            {/*    {pagination !=null && pagination.page_count !==1 && (<Pagination.Item disabled>{pagination.current_page}</Pagination.Item>)} */}
            {/*    {(pagination != null && pagination.has_next_page === true) && */}
            {/*        <Pagination.Next onClick={loadNextPage}/>} */}

            {/* </Pagination> */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EmployeeDocumentList;
