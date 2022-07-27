import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadTaskCategories } from '../../store/actions/task_categories';
import CustomPagination from '../../components/CustomPagination';

const TaskCategoriesList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {}, [sort, direction]);

  const onArrowClickHandler = (title) => {
    setSort(title);
    if (direction === 'asc') {
      setDirection('desc');
    } else {
      setDirection('asc');
    }
  };
  useEffect(() => {
    console.log('inside useEffect search text box');

    const timer = setTimeout(() => {
      fetchTaskCategories();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const taskCategories = useSelector(
    (state) => state.taskCategory.taskCategories
  );
  const pagination = useSelector((state) => state.taskCategory.pagination);

  const fetchTaskCategories = async () => {
    await dispatch(loadTaskCategories(1, searchText, sort, direction, 5));
  };
  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadTaskCategories(page + 1, searchText, sort, direction, 5)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadTaskCategories(page - 1, searchText, sort, direction, 5)
    );
  };

  const renderTable = () => {
    console.log('task categories = ', taskCategories);
    return taskCategories.map((taskCategory) => {
      return (
        <tr key={taskCategory.id}>
          <td>{taskCategory.name}</td>
          <td>{taskCategory.industry && taskCategory.industry.name}</td>
          <td>{taskCategory.company && taskCategory.company.name}</td>
          <td>{taskCategory.division && taskCategory.division.name}</td>
          <td>{taskCategory.job_site && taskCategory.job_site.name}</td>
          <td>
            <Link to={`/task-Categories/view/${taskCategory.id}`}>
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
            <Link to={`/task-categories/edit/${taskCategory.id}`}>
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
      <Col md={12}>
        <Card>
          <Card.Header>
            List of Task Category
            <NavLink to="/task-categories/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Task Categories
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
                        onClick={() => onArrowClickHandler('name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Name', 'name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('industry.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Industry', 'industry_id')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Companies.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Company', 'Companies.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('divisions.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Division', 'divisions.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('jobSites.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Project', 'jobSites.name')}
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
        </Card>
      </Col>
    </Row>
  );
};
export default TaskCategoriesList;
