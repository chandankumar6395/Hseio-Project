import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import CustomPagination from '../../components/CustomPagination';
import { loadTasks } from '../../store/actions/tasks';
import { toMMMDDYYHHMM } from '../../utils/Utils';

const TaskList = () => {
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(() => {
      fetchTasks();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const tasks = useSelector((state) => state.task.tasks);

  const pagination = useSelector((state) => state.task.pagination);

  const fetchTasks = async () => {
    await dispatch(loadTasks(1, searchText, sort, direction));
  };
  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadTasks(page + 1, searchText, sort, direction));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadTasks(page - 1, searchText, sort, direction));
  };

  const renderTable = () => {
    return tasks.map((task) => {
      return (
        <tr key={task.id}>
          <td>{task.name}</td>
          {/* <td>{task.long_desc}</td> */}
          {/* <td>{task.short_desc}</td> */}
          {/* <td>{task.priority}</td> */}
          <td>{toMMMDDYYHHMM(task.start_date_time)}</td>
          <td>{toMMMDDYYHHMM(task.end_date_time)}</td>
          {/* <td>{task.manpower}</td> */}
          {/* <td>{task.cost}</td> */}
          <td>{task.parent_task ? task.parent_task.name : ''}</td>
          {/* <td>{toMMDDYYHHMM(task.completed_date_time)}</td> */}
          {/* <td>{task.industry ? task.industry.name : ''}</td> */}
          <td>{task.company ? task.company.name : ''}</td>
          <td>{task.division ? task.division.name : ''}</td>
          <td>{task.job_site ? task.job_site.name : ''}</td>
          <td>
            <Link to={`/tasks/view/${task.id}`}>
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
            <Link to={`/tasks/edit/${task.id}`}>
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
    fetchTasks();
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
            List of Tasks
            <NavLink to="/tasks/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Tasks
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
                        onClick={() => onArrowClickHandler('name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Name', 'name')}
                      </span>
                    </th>
                    {/* TODO : Mayank you have wrong order of these 2 column */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('long_desc')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Description', 'long_desc')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('short_desc')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Short Desc', 'short_desc')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('priority')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Priority', 'priority')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('start_date_time')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Start Date Time',
                          'start_date_time'
                        )}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('end_date_time')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('End Date Time', 'end_date_time')}
                      </span>
                    </th>
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('manpower')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Manpower ', 'manpower')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('cost')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Cost', 'cost')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('parent_id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Parent Task', 'parent_id')}
                      </span>
                    </th>
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => */}
                    {/*      onArrowClickHandler('completed_date_time') */}
                    {/*    } */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle( */}
                    {/*      'Completed Date Time', */}
                    {/*      'completed_date_time' */}
                    {/*    )} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('Industry_id')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Industry Id', 'Industry_id')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Company.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Company', 'Company.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Division.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Division', 'Division.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Job_site.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Project', 'Job_site.name')}
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

export default TaskList;
