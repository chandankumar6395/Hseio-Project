import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import { loadDivisions } from '../../store/actions/divisions';
import CustomPagination from '../../components/CustomPagination';

const DivisionList = () => {
  const { id: companyId } = useParams();
  console.log(`---------->${JSON.stringify(companyId)}`);

  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchDivisions();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const divisions = useSelector((state) => state.division.divisions);
  const pagination = useSelector((state) => state.division.pagination);

  useEffect(() => {
    // fetchDivisions();
  }, []);

  const fetchDivisions = async () => {
    await dispatch(loadDivisions(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadDivisions(page + 1, searchText, sort, direction));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadDivisions(page - 1, searchText, sort, direction));
  };

  const renderTable = () => {
    return divisions.map((division) => {
      return (
        <tr key={division.id}>
          <td>{division.id}</td>
          <td>{division.name}</td>
          <td>{division.company.name}</td>
          <td>{division.address !== null ? division.address.address1 : ''}</td>
          <td>{division.head_office === 0 ? 'No' : 'Yes'}</td>
          <td>{division.status.name}</td>
          <td>
            <Link to={`/divisions/view/${division.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>

            <Link to={`/divisions/edit/${division.id}`}>
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

  useEffect(() => {
    // console.log('inside useeffect');
    // fetchDivisions();
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

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            List of Divisions
            <NavLink to="/divisions/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Division
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
                        onClick={() => onArrowClickHandler('Companies.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Company', 'Companies.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('address1')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Address', 'address1')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Head Office')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Head Office', 'head_office')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Status Id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Status', 'status_name')}
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

            {/* <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address 1</th>
                                    <th>Address 2</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Country</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                </tr>
                                </thead>
                                <tbody>

                                {renderTable()}

                                </tbody>
                            </Table> */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DivisionList;
