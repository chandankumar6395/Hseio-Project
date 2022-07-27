import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import { loadJobSiteCrewMembers } from '../../store/actions/job_site_crew_members';
import CustomPagination from '../../components/CustomPagination';

const JobSiteCrewMemberList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    // console.log('inside useffect');
    // loadJobSiteCrewMembers();
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
    console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchJobSiteCrewMembers();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  // const jobSites = useSelector((state) => state.jobSite.jobSites);
  const jobSiteCrewMembers = useSelector(
    (state) => state.jobSiteCrewMember.jobSiteCrewMembers
  );
  // const employees = useSelector((state) => state.employees.employees);
  // const jobSiteCrews = useSelector((state) => state.jobSiteCrew.jobSiteCrews);
  const pagination = useSelector((state) => state.jobSite.pagination);

  useEffect(() => {
    // fetchJobSiteCrewMembers();
  }, []);

  const fetchJobSiteCrewMembers = async () => {
    await dispatch(loadJobSiteCrewMembers(1, searchText, sort, direction, 5));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadJobSiteCrewMembers(page + 1, searchText, sort, direction, 5)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadJobSiteCrewMembers(page - 1, searchText, sort, direction, 5)
    );
  };

  const renderTable = () => {
    return jobSiteCrewMembers.map((jobSiteCrewMember) => {
      return (
        <tr key={jobSiteCrewMember.id}>
          <td>{jobSiteCrewMember.id}</td>
          <td>{jobSiteCrewMember.job_site_crew.name}</td>
          <td>{jobSiteCrewMember.job_site.name}</td>
          <td>{jobSiteCrewMember.employee.user.first_name}</td>
          {/* <td>{jobSiteCrewMember.jobSite.name}</td> */}
          {/* <td>{jobSite.client !== null ? jobSite.client.name : ''}</td> */}
          <td>
            <Link
              to={`/private/job-site-crew-members/view/${jobSiteCrewMember.id}`}
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
              to={`/private/job-site-crew-members/edit/${jobSiteCrewMember.id}`}
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
            List of Project
            <NavLink to="/private/job-site-crew-members/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add JobSiteCrewMember
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
                        onClick={() => onArrowClickHandler('JobSiteCrew.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('JobSiteCrew', 'JobSiteCrew.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('JobSite.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Project', 'JobSite.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Employee.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Employee', 'Employee.name')}
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

export default JobSiteCrewMemberList;
