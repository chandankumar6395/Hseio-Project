import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import CustomPagination from '../../components/CustomPagination';
import { loadTrainingCoursesTrainingEvent } from '../../store/actions/ training_courses_training_events';

const TrainingCoursesTrainingEventList = () => {
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchTrainingCoursesTrainingEvents();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const trainingCoursesTrainingEvents = useSelector(
    (state) => state.trainingCoursesTrainingEvents.trainingCoursesTrainingEvents
  );

  const pagination = useSelector(
    (state) => state.trainingCoursesTrainingEvents.pagination
  );
  useEffect(() => {}, []);

  const fetchTrainingCoursesTrainingEvents = async () => {
    await dispatch(
      loadTrainingCoursesTrainingEvent(1, searchText, sort, direction)
    );
  };
  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadTrainingCoursesTrainingEvent(page + 1, searchText, sort, direction)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadTrainingCoursesTrainingEvent(page - 1, searchText, sort, direction)
    );
  };

  const renderTable = () => {
    return trainingCoursesTrainingEvents.map((trainingCoursesTrainingEvent) => {
      return (
        <tr key={trainingCoursesTrainingEvent.id}>
          <td>{trainingCoursesTrainingEvent.training_course.name}</td>
          <td>{trainingCoursesTrainingEvent.training_event.name}</td>
          <td>
            <Link
              to={`/training-courses-training-events/view/${trainingCoursesTrainingEvent.id}`}
            >
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
            <Link
              to={`/training-courses-training-events/edit/${trainingCoursesTrainingEvent.id}`}
            >
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
            List of Training Courses Training Event
            <NavLink to="/training-courses-training-events/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Training Courses Training Event
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
                        onClick={() =>
                          onArrowClickHandler('training_course_id')
                        }
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Training Course',
                          'training_course_id'
                        )}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('training_event_id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Training Event',
                          'training_event_id'
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
          </Card.Body>

          {/* <Card.Footer style={{marginBottom:'10px'}}> */}

          {/* </Card.Footer> */}
        </Card>
      </Col>
    </Row>
  );
};

export default TrainingCoursesTrainingEventList;
