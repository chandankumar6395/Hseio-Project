/* eslint-disable camelcase */
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';

import { loadTrainingEventEmployeeStatuses } from '../../store/actions/training_event_employee_statuses';
import CustomPagination from '../../components/CustomPagination';

const TrainingEventEmployeeStatus = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    fetchTrainingEventEmployeeStatus();
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
    const timer = setTimeout(async () => {}, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const trainingEventEmployeeStatuses = useSelector(
    (state) => state.trainingEventEmployeeStatus.trainingEventEmployeeStatuses
  );
  const pagination = useSelector(
    (state) => state.trainingEventEmployeeStatus.pagination
  );

  const fetchTrainingEventEmployeeStatus = async () => {
    await dispatch(
      loadTrainingEventEmployeeStatuses(1, searchText, sort, direction)
    );
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadTrainingEventEmployeeStatuses(page + 1, searchText, sort, direction)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadTrainingEventEmployeeStatuses(page - 1, searchText, sort, direction)
    );
  };

  const renderTable = () => {
    return trainingEventEmployeeStatuses.map((trainingEventEmployeeStatus) => {
      return (
        <tr key={trainingEventEmployeeStatus.id}>
          <td>{trainingEventEmployeeStatus.name}</td>
          <td>{trainingEventEmployeeStatus.short_desc}</td>
          <td>{trainingEventEmployeeStatus.long_desc}</td>
          <td>
            <Link
              to={`/training-event-employee-statuses/view/${trainingEventEmployeeStatus.id}`}
            >
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>
            <Link
              to={`/training-event-employee-statuses/edit/${trainingEventEmployeeStatus.id}`}
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
        </tr>
      );
    });
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            List of Training Event Employee Status
            <NavLink to="/training-event-employee-statuses/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Training Event Employee Status
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
                        onClick={() => onArrowClickHandler('short_desc')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Short Desc', 'short_desc')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('long_desc')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Long desc', 'long_desc')}
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

export default TrainingEventEmployeeStatus;
