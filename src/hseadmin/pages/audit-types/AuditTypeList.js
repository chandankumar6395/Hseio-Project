import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadAuditTypes } from '../../store/actions/audit_types';
import CustomPagination from '../../components/CustomPagination';

const AuditTypeList = () => {
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      fetchAuditTypes();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  // eslint-disable-next-line camelcase
  const auditTypes = useSelector((state) => state.auditType.auditTypes);
  const pagination = useSelector((state) => state.auditType.pagination);

  useEffect(() => {
    // fetchAuditTypes();
  }, []);

  const fetchAuditTypes = async () => {
    await dispatch(loadAuditTypes(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadAuditTypes(page + 1, searchText, sort, direction));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadAuditTypes(page - 1, searchText, sort, direction));
  };

  const renderTable = () => {
    return auditTypes.map((auditType) => {
      return (
        <tr key={auditType.id}>
          <td>{auditType.id}</td>
          <td>{auditType.name}</td>
          <td>{auditType.short_desc}</td>
          <td>{auditType.long_desc}</td>
          <td>
            <Link to={`/audit-types/view/${auditType.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>
            <Link to={`/audit-types/edit/${auditType.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                Edit
              </Button>
            </Link>
          </td>
        </tr>
      );
    });
  };
  useEffect(() => {}, [sort, direction]);

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
            List of Audit Types
            <NavLink to="/audit-types/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Audit Types
              </Button>
            </NavLink>
          </Card.Header>
          <Card.Body>
            <CustomPagination
              pagination={pagination}
              loadPrevPage={loadPrevPage}
              loadNextPage={loadNextPage}
            />

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                required
                type="text"
                placeholder="Search"
                onChange={onSearchTextChangeHandler}
              />
            </Form.Group>
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
                        {renderHeaderTitle('Name', 'name')}
                      </span>
                    </th>
                    <th>Short Desc</th>
                    <th>Description</th>
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
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AuditTypeList;
