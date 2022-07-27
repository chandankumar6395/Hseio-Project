/* eslint-disable no-unused-vars */
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import { loadClients } from '../../store/actions/clients';
import { resetLogo } from '../../store/actions/logos';
import { resetBanner } from '../../store/actions/banners';
import CustomPhoneNumberView from '../../components/CustomPhoneNumberView';
import CustomPagination from '../../components/CustomPagination';

const ClientList = (props) => {
  const { id: companyId } = useParams();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchClients();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction, companyId]);

  const clients = useSelector((state) => state.client.clients);
  const pagination = useSelector((state) => state.client.pagination);

  useEffect(() => {
    // fetchClients();
  }, [companyId]);

  useEffect(() => {
    // fetchClients();
  }, [sort, direction]);

  const fetchClients = async () => {
    await dispatch(loadClients(1, searchText, sort, direction, companyId));
    await dispatch(resetLogo());
    await dispatch(resetBanner());
  };
  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadClients(page + 1, searchText, sort, direction, companyId)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadClients(page - 1, searchText, sort, direction, companyId)
    );
  };

  const renderTable = () => {
    return clients.map((client) => {
      return (
        <tr key={client.id}>
          {/* <td>{client.id}</td> */}
          <td>
            {client.primary_logo !== null && (
              <img
                src={client.primary_logo.url}
                width={100}
                style={{
                  // backgroundColor: '#35363A',
                  padding: '2px',
                  width: '100',
                  height: 'auto',
                }}
                alt="Client Logo"
              />
            )}
          </td>
          <td>{client.name}</td>
          {/* <td>{client.company.name}</td> */}
          {/* <td>{client.short_desc}</td> */}
          {/* <td>{client.long_desc}</td> */}
          {/* <td>{client.email_address}</td> */}
          <td>
            <CustomPhoneNumberView value={client.landline} />
          </td>
          {/* <td>{client.fax}</td> */}
          <td>
            <CustomPhoneNumberView value={client.mobile} />
          </td>
          <td>{client.website_url}</td>
          {/* <td>{client.about_us_url}</td> */}
          {/* <td>{client.privacy_policy_url}</td> */}
          {/* <td>{client.terms_and_condition}</td> */}
          <td>
            <Link to={`/clients/view/${client.id}`}>
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
            <Link to={`/clients/edit/${client.id}`}>
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
    // console.log('inside useffect');
    // fetchClients();
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
            List of Clients
            <NavLink to="/clients/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Client
              </Button>
            </NavLink>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                required
                type="text"
                placeholder="Search"
                onChange={onSearchTextChangeHandler}
              />
            </Form.Group>

            <CustomPagination
              pagination={pagination}
              loadPrevPage={loadPrevPage}
              loadNextPage={loadNextPage}
            />
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
                    <th>Logo</th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Name', 'name')}
                      </span>
                    </th>
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('Companies.name')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Company Name', 'Companies.name')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th>Short_desc</th> */}
                    {/* <th>Long_desc</th> */}
                    {/* <th>Email_address</th> */}
                    <th>Office</th>
                    {/* <th>Fax</th> */}
                    <th>Mobile</th>
                    <th>Website</th>
                    {/* <th>About_us_url</th> */}
                    {/* <th>Privacy_policy_url</th> */}
                    {/* <th>Terms_and_condition_url</th> */}
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

export default ClientList;
