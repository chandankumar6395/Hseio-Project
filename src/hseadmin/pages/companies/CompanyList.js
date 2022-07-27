import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import CustomSearchComponent from '../../components/CustomSearchComponent';
// import CustomPhoneNumberView from '../../components/CustomPhoneNumberView';
import CustomPhoneNumberView from '../../components/CustomPhoneNumberView';
import { loadCompanies } from '../../store/actions/companies';
import CustomPagination from '../../components/CustomPagination';

const CompanyList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('desc');

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchCompanies();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const companies = useSelector((state) => state.company.companies);
  const pagination = useSelector((state) => state.company.pagination);

  useEffect(() => {
    // fetchCompanies();
  }, []);

  useEffect(() => {
    // fetchCompanies();
  }, [sort, direction]);
  const fetchCompanies = async () => {
    if (pagination === null) {
      await dispatch(loadCompanies(1, searchText, sort, direction));
    } else {
      setPage(pagination.current_page);
      await dispatch(
        loadCompanies(pagination.current_page, searchText, sort, direction)
      );
    }
  };
  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadCompanies(page + 1, searchText, sort, direction));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadCompanies(page - 1, searchText, sort, direction));
  };

  const renderTable = () => {
    return companies.map((company) => {
      return (
        <tr key={company.id}>
          {/* <td>{company.id}</td> */}
          <td style={{ textAlign: 'center' }}>
            {company.primary_logo !== null ? (
              <img
                src={company.primary_logo.url}
                width={100}
                height={100}
                style={{
                  // backgroundColor: '#35363A',
                  padding: '2px',
                  width: '100',
                  height: 'auto',
                }}
                alt="company logo"
              />
            ) : (
              <i className="fas fa-building fa-2x" />
            )}
          </td>
          <td>{company.name}</td>
          {/* <td>{company.short_desc}</td> */}
          {/* <td>{company.long_desc}</td> */}
          {/* <td>{company.email_address}</td> */}
          <td>
            <CustomPhoneNumberView value={company.landline} />
          </td>
          {/* <td>{company.fax}</td> */}
          <td>
            <CustomPhoneNumberView value={company.mobile} />
          </td>
          <td>{company.website_url}</td>
          {/* <td>{company.about_us_url}</td> */}
          {/* <td>{company.privacy_policy_url}</td> */}
          {/* <td>{company.terms_and_condition}</td> */}
          <td>
            <Link to={`/private/companies/view/${company.id}`}>
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
            <Link to={`/private/companies/edit/${company.id}`}>
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
            List of Company
            <NavLink to="/private/companies/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Company
              </Button>
            </NavLink>
          </Card.Header>
          <Card.Body>
            <CustomSearchComponent onSearch={onSearchTextChangeHandler} />

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
                    {/*    style={{cursor: 'pointer'}} */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('ID', 'id')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    <th>Logo</th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('name')}
                        aria-hidden="true"
                        style={{ cursor: 'pointer' }}
                      >
                        {renderHeaderTitle('Name', 'name')}
                      </span>
                    </th>
                    {/* <th>Short_desc</th> */}
                    {/* <th>Long_desc</th> */}
                    {/* <th>Email_address</th> */}
                    <th>Office</th>
                    {/* <th>Fax</th> */}
                    <th>Mobile</th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('website_url')}
                        aria-hidden="true"
                        style={{ cursor: 'pointer' }}
                      >
                        {renderHeaderTitle('Website', 'website_url')}
                      </span>
                    </th>
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

export default CompanyList;
