import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadAddresses } from '../../store/actions/addresses';
import CustomPagination from '../../components/CustomPagination';

const AddressList = () => {
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchAddresses();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const addresses = useSelector((state) => state.address.addresses);
  const pagination = useSelector((state) => state.address.pagination);

  useEffect(() => {
    // fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    await dispatch(loadAddresses(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadAddresses(page + 1, searchText, sort, direction));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadAddresses(page - 1, searchText, sort, direction));
  };

  const renderTable = () => {
    return addresses.map((address) => {
      return (
        <tr key={address.id}>
          <td>{address.id}</td>
          <td>{address.name}</td>
          <td>{address.address1}</td>
          <td>{address.address2}</td>
          <td>{address.zipcode}</td>
          <td>{address.city_name}</td>
          <td>{address.state_name}</td>
          <td>{address.country_name}</td>
          <td>{address.latitude}</td>
          <td>{address.longitude}</td>
          <td>
            <Link to={`/private/addresses/view/${address.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>

            <Link to={`/private/addresses/edit/${address.id}`}>
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
    // fetchAddresses();
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
            List of Address
            <NavLink to="/private/addresses/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Address
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
                        onClick={() => onArrowClickHandler('address1')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Address', 'address1')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('address2')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Address2', 'address2')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('zipcode')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Zip', 'zip')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('city')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('City', 'city')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('state')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('State', 'state')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('country')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Country', 'country')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('latitude')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Latitude', 'latitude')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('longitude')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Longitude', 'longitude')}
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

export default AddressList;
