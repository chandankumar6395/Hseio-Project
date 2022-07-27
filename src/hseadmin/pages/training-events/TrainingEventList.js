import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadTrainingEvent } from '../../store/actions/trainingEvents';
import { toMMMDDYYHHMM } from '../../utils/Utils';
import CustomPagination from '../../components/CustomPagination';

const TrainingEventList = () => {
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    //  console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchTrainingEvent();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const trainingEvents = useSelector(
    (state) => state.trainingEvent.trainingEvents
  );
  const pagination = useSelector((state) => state.trainingEvent.pagination);

  useEffect(() => {
    // fetchTrainingEvent();
  }, []);

  const fetchTrainingEvent = async () => {
    await dispatch(loadTrainingEvent(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadTrainingEvent(page + 1, searchText, sort, direction));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadTrainingEvent(page - 1, searchText, sort, direction));
  };

  const renderTrainingEvent = () => {
    return trainingEvents.map((trainingEvent) => {
      return (
        <tr key={trainingEvent.id}>
          <td>{trainingEvent.id}</td>
          <td>{trainingEvent.name}</td>
          <td>{trainingEvent.short_desc}</td>
          <td>{trainingEvent.long_desc}</td>
          <td>{toMMMDDYYHHMM(trainingEvent.proposed_start_date)}</td>
          <td>{toMMMDDYYHHMM(trainingEvent.proposed_end_date)}</td>
          <td>{toMMMDDYYHHMM(trainingEvent.actual_start_date)}</td>
          <td>{toMMMDDYYHHMM(trainingEvent.actual_end_date)}</td>
          <td>{toMMMDDYYHHMM(trainingEvent.expire_date)}</td>
          <td>{trainingEvent.self === 0 ? 'No' : 'Yes'}</td>
          <td>{trainingEvent.training_event_status.name}</td>
          <td>
            <Link to={`/training-events/view/${trainingEvent.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>
            <Link to={`/training-events/edit/${trainingEvent.id}`}>
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
            List of Training Event
            <NavLink to="/training-events/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Training Event
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
                    <th>Long Desc</th>
                    <th>Proposed Start Date</th>
                    <th>Proposed End Date</th>
                    <th>Actual Start date</th>
                    <th>Actual End date</th>
                    <th>Expire Date</th>
                    <th>Self</th>
                    <th>Training Event Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{renderTrainingEvent()}</tbody>
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

export default TrainingEventList;
