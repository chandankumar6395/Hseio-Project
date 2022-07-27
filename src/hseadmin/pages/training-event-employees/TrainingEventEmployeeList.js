import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadTrainingEventEmployees } from '../../store/actions/training_event_employees';
import { toMMMDDYYHHMM } from '../../utils/Utils';
import CustomPagination from '../../components/CustomPagination';

const TrainingEventEmployeeList = () => {
  // const {id} = useParams();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

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
    console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchTrainingEventEmployees();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const trainingEventEmployees = useSelector(
    (state) => state.trainingEventEmployee.trainingEventEmployees
  );
  const pagination = useSelector(
    (state) => state.trainingEventEmployee.pagination
  );

  console.log('abc -->');
  const fetchTrainingEventEmployees = async () => {
    await dispatch(loadTrainingEventEmployees(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadTrainingEventEmployees(page + 1, searchText, sort, direction)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadTrainingEventEmployees(page - 1, searchText, sort, direction)
    );
  };

  const renderTable = () => {
    return trainingEventEmployees.map((trainingEventEmployee) => {
      return (
        <tr key={trainingEventEmployee.id}>
          {/* <td>{trainingEventEmployee.id}</td> */}
          <td>
            {trainingEventEmployee.primary_photo !== null && (
              <img
                src={trainingEventEmployee.primary_photo.url}
                width={100}
                height={100}
                style={{
                  backgroundColor: 'white',
                  padding: '2px',
                  borderRadius: '10px',
                }}
                alt="company logo"
              />
            )}
          </td>
          {/* <td>{trainingEventEmployee.signature}</td> */}
          <td>
            {trainingEventEmployee.signature !== null && (
              <img
                src={trainingEventEmployee.signature.url}
                width={100}
                height={100}
                style={{
                  backgroundColor: 'white',
                  padding: '2px',
                  borderRadius: '10px',
                }}
                alt="Signature"
              />
            )}
          </td>
          <td>
            {trainingEventEmployee.training_event !== null
              ? trainingEventEmployee.training_event.name
              : ''}
          </td>
          {/* <td>{auditTask.company.name}</td> */}
          <td>
            {trainingEventEmployee.employee !== null
              ? `${trainingEventEmployee.employee.user.first_name} ${trainingEventEmployee.employee.user.last_name}`
              : ''}
          </td>
          {/* <td> */}
          {/*  {trainingEventEmployee.employee.user !== null */}
          {/*    ? trainingEventEmployee.employee.user.username */}
          {/*    : ''} */}
          {/* </td> */}
          {/* <td> */}
          {/*  {trainingEventEmployee !== null */}
          {/*    ? trainingEventEmployee.primary_photo */}
          {/*    : ''} */}
          {/* </td> */}

          <td>
            {trainingEventEmployee.training_course !== null
              ? trainingEventEmployee.training_course.name
              : ''}
          </td>
          <td>
            {trainingEventEmployee.certificate !== null
              ? trainingEventEmployee.certificate.name
              : ''}
          </td>
          <td>{trainingEventEmployee.training_event_employee_status.name}</td>
          <td>{toMMMDDYYHHMM(trainingEventEmployee.completion_date)}</td>
          <td>
            <Link
              to={`/training-event-employees/view/${trainingEventEmployee.id}`}
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
              to={`/training-event-employees/edit/${trainingEventEmployee.id}`}
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
            List of Training Event Employee
            <NavLink to="/training-event-employees/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Training Event Employee
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
                        onClick={() => onArrowClickHandler('primary_photo')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Primary Photo', 'primary_photo')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('signature')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Signature', 'signature')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() =>
                          onArrowClickHandler('training_event.name')
                        }
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Training Event',
                          'training_event.name'
                        )}
                      </span>
                    </th>

                    <th>
                      <span
                        onClick={() => onArrowClickHandler('employee.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Employee', 'employee.name')}
                      </span>
                    </th>
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('user.name')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Username', 'user.name')} */}
                    {/*  </span> */}
                    {/* </th> */}

                    <th>
                      <span
                        onClick={() =>
                          onArrowClickHandler('training_course.name')
                        }
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Training Course',
                          'training_course.name'
                        )}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('certificate.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Certificate', 'certificate.name')}
                      </span>
                    </th>

                    <th>
                      <span
                        onClick={() =>
                          onArrowClickHandler(
                            'training_event_employee_status_id'
                          )
                        }
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Training Event Employee Status',
                          'training_event_employee_status.name'
                        )}
                      </span>
                    </th>

                    <th>
                      <span
                        onClick={() => onArrowClickHandler('completion_date')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Completion Date',
                          'completion_date'
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

export default TrainingEventEmployeeList;
