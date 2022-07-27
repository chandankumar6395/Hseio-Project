import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadAuditTaskCategory } from '../../store/actions/audit_task_categories';
import CustomPagination from '../../components/CustomPagination';

const AuditTaskCategoriesList = () => {
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchAuditTaskCategories();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const auditTaskCategories = useSelector(
    (state) => state.auditTaskCategories.auditTaskCategories
  );
  const pagination = useSelector(
    (state) => state.auditTaskCategories.pagination
  );

  const fetchAuditTaskCategories = async () => {
    await dispatch(loadAuditTaskCategory(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadAuditTaskCategory(page + 1, searchText, sort, direction)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadAuditTaskCategory(page - 1, searchText, sort, direction)
    );
  };

  const renderTable = () => {
    return auditTaskCategories.map((auditTaskCategory) => {
      return (
        <tr key={auditTaskCategory.id}>
          <td>{auditTaskCategory.id}</td>
          <td>{auditTaskCategory.name}</td>
          <td>
            {auditTaskCategory.audit_tasks.map((item) => {
              return <p key={item.id}>{item.name}</p>;
            })}
          </td>
          <td>
            <Link to={`/audit-task-categories/view/${auditTaskCategory.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{
                  marginBottom: '4px',
                  marginRight: '4px',
                  backgroundColor: '#007bff',
                }}
              >
                View
              </Button>
            </Link>
            <Link to={`/audit-task-categories/edit/${auditTaskCategory.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                Edit
              </Button>
            </Link>
          </td>
          {/* http://localhost:3000/indusries/edit/1   */}
        </tr>
      );
    });
  };

  useEffect(() => {
    // console.log('inside useeffect');
    // fetchIndustries();
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
        {title}
        {arrow}
      </>
    );
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            List of Audit Task Categories
            <NavLink to="/audit-task-categories/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Audit Task Categories
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
                placeholder="Search by name"
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
                        style={{ cursor: 'pointer' }}
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
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('audit_task_id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Audit Task', 'audit_task.name')}
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
          </Card.Body>

          {/* <Card.Footer style={{marginBottom:'10px'}}> */}

          {/* </Card.Footer> */}
        </Card>
      </Col>
    </Row>
  );
};

export default AuditTaskCategoriesList;
