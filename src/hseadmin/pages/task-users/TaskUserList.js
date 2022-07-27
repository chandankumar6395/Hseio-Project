import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadTaskUsers } from '../../store/actions/task_users';
import { toMMMDDYYHHMM } from '../../utils/Utils';
import CustomPagination from '../../components/CustomPagination';

const TaskUserList = () => {
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    //  console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchTaskUser();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const taskUsers = useSelector((state) => state.taskUser.taskUsers);
  const pagination = useSelector((state) => state.taskUser.pagination);

  useEffect(() => {
    // fetchTrainingEvent();
  }, []);

  const fetchTaskUser = async () => {
    await dispatch(loadTaskUsers(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadTaskUsers(page + 1, searchText, sort, direction));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadTaskUsers(page - 1, searchText, sort, direction));
  };

  const renderTaskUser = () => {
    return taskUsers.map((taskUser) => {
      return (
        <tr key={taskUser.id}>
          {/* <td>{taskUser.id}</td> */}
          <td>{taskUser.task.name}</td>
          <td>{`${taskUser.user.first_name} ${taskUser.user.last_name}`}</td>
          <td>{taskUser.status.name}</td>
          <td>{taskUser.job_site_crew.name}</td>
          <td>{toMMMDDYYHHMM(taskUser.start_date_time)}</td>
          <td>{toMMMDDYYHHMM(taskUser.end_date_time)}</td>
          <td>{toMMMDDYYHHMM(taskUser.completed_date_time)}</td>
          <td>
            <Link to={`/task-users/view/${taskUser.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>
            <Link to={`/task-users/edit/${taskUser.id}`}>
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
            List of Task User
            <NavLink to="/task-users/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Task User
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
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('id')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('ID', 'id')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('task')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Task', 'task')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('user')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('User Name', 'user')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('status')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Status', 'status')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() =>
                          onArrowClickHandler('job_site_crew.name')
                        }
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Project Crew',
                          'job_site_crew.name'
                        )}
                      </span>
                    </th>
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
                    <th>
                      <span
                        onClick={() =>
                          onArrowClickHandler('completed_date_time')
                        }
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Completed Date Time',
                          'completed_date_time'
                        )}
                      </span>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{renderTaskUser()}</tbody>
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

export default TaskUserList;
