/* eslint-disable camelcase */
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';

import CustomPagination from '../../components/CustomPagination';
import { loadTrainingCourseList } from '../../store/actions/training_courses';

const TrainingCourseList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    // console.log('inside useffect');
    // fetchTrainingCourses();
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

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchTrainingCourses();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const training_courses = useSelector(
    (state) => state.trainingCourse.training_courses
  );
  const pagination = useSelector((state) => state.trainingCourse.pagination);

  useEffect(() => {
    // fetchTrainingCourses();
  }, []);

  const fetchTrainingCourses = async () => {
    await dispatch(loadTrainingCourseList(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadTrainingCourseList(page + 1, searchText, sort, direction)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadTrainingCourseList(page - 1, searchText, sort, direction)
    );
  };

  const renderTable = () => {
    return training_courses.map((trainingCourse) => {
      return (
        <tr key={trainingCourse.id}>
          <td>{trainingCourse.id}</td>
          <td>{trainingCourse.name}</td>
          <td>{trainingCourse.training_course_type.name}</td>
          <td>{trainingCourse.durations} minutes</td>
          <td>{trainingCourse.recurring === 0 ? 'No' : 'Yes'}</td>
          <td>{trainingCourse.recurring_in_days}</td>
          <td>{trainingCourse.mandatory === 0 ? 'No' : 'Yes'}</td>
          <td>{trainingCourse.issue_certificate === 0 ? 'No' : 'Yes'}</td>
          <td>
            {trainingCourse.sample_certificate &&
              trainingCourse.sample_certificate.name}
          </td>
          <td>{trainingCourse.thumbnail && trainingCourse.thumbnail.name}</td>
          <td>
            <Link to={`/training-courses/view/${trainingCourse.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>
            <Link to={`/training-courses/edit/${trainingCourse.id}`}>
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

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            List of Training Course
            <NavLink to="/training-courses/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Training Course
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
                    <th>Training Course Type</th>
                    <th>Durations</th>
                    <th>Recurring</th>
                    <th>Recurring In Days</th>
                    <th>Mandatory</th>
                    <th>Issue Certificate</th>
                    <th>Sample Certificate</th>
                    <th>Thumbnail</th>
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

export default TrainingCourseList;
