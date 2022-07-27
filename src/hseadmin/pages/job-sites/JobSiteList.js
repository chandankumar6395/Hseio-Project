import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink, useParams } from 'react-router-dom';
import { loadJobSites } from '../../store/actions/jobSites';
import CustomPagination from '../../components/CustomPagination';

const JobSiteList = () => {
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const { id: companyId } = useParams();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    // console.log('inside useffect');
    // fetchJobSites();
  }, [sort, direction]);

  useEffect(() => {
    fetchJobSites();
    console.log('JobSiteList useEffect ', localDivisionId);
  }, [localDivisionId]);

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
      fetchJobSites();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction, companyId]);

  const jobSites = useSelector((state) => state.jobSite.jobSites);
  const pagination = useSelector((state) => state.jobSite.pagination);

  useEffect(() => {
    // fetchJobSites();
  }, [companyId]);

  const fetchJobSites = async () => {
    await dispatch(
      loadJobSites(1, searchText, sort, direction, companyId, localDivisionId)
    );
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadJobSites(
        page + 1,
        searchText,
        sort,
        direction,
        companyId,
        localDivisionId
      )
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadJobSites(
        page - 1,
        searchText,
        sort,
        direction,
        companyId,
        localDivisionId
      )
    );
  };

  const renderTable = () => {
    return jobSites.map((jobSite) => {
      return (
        <tr key={jobSite.id}>
          {/* <td>{jobSite.id}</td> */}
          <td>{jobSite.name}</td>
          {/* <td>{jobSite.short_desc}</td> */}
          {/* <td>{jobSite.long_desc}</td> */}
          {/* <td>{jobSite.supervisor_employee_id != null ? employee.parent_industry.name : ''}</td> */}
          <td>{jobSite.address !== null ? jobSite.address.address1 : ''}</td>
          <td>{jobSite.company.name}</td>
          <td>{jobSite.client !== null ? jobSite.client.name : ''}</td>
          <td>
            <Link to={`/job-sites/view/${jobSite.id}`}>
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
            <Link to={`/job-sites/edit/${jobSite.id}`}>
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
            List of Project
            <NavLink to="/job-sites/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Project
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
                        onClick={() => onArrowClickHandler('name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Name', 'name')}
                      </span>
                    </th>
                    {/* <th>Short Desc</th> */}
                    {/* <th>Description</th> */}
                    {/* <th>Supervisor Employee Id</th> */}
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
                        onClick={() => onArrowClickHandler('Companies.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Company Name', 'Companies.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Clients.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Client Name', 'Clients.name')}
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

export default JobSiteList;
