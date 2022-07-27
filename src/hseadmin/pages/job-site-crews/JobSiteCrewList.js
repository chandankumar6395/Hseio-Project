import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadJobSiteCrew } from '../../store/actions/jobSiteCrews';
import CustomPagination from '../../components/CustomPagination';

const JobSiteCrewList = () => {
  // const {id: companyId} = useParams();
  // const {id: divisionId} = useParams();
  // const {id: jobSiteId} = useParams();
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    //  console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchJobSiteCrew();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const jobSiteCrews = useSelector((state) => state.jobSiteCrew.jobSiteCrews);
  const pagination = useSelector((state) => state.jobSiteCrew.pagination);

  useEffect(() => {
    // console.log('useEffect ==> ViewJobSiteCrew');
    // fetchJobSiteCrew();
  }, []);

  const fetchJobSiteCrew = async () => {
    await dispatch(loadJobSiteCrew(1, searchText, sort, direction, 5));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadJobSiteCrew(page + 1, searchText, sort, direction, 5));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadJobSiteCrew(page - 1, searchText, sort, direction, 5));
  };

  const renderJobSiteCrew = () => {
    return jobSiteCrews.map((jobSiteCrew) => {
      return (
        <tr key={jobSiteCrew.id}>
          <td>{jobSiteCrew.id}</td>
          <td>{jobSiteCrew.name}</td>
          <td>{jobSiteCrew.short_desc}</td>
          <td>{jobSiteCrew.long_desc}</td>
          {/* <td>{jobSiteCrew.company_id}</td> */}
          {/* <td>{jobSiteCrew.primary_division_id}</td> */}
          <td>{jobSiteCrew.job_site_id}</td>
          <td>
            <Link to={`/private/job-site-crews/view/${jobSiteCrew.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>
            <Link to={`/private/job-site-crews/edit/${jobSiteCrew.id}`}>
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
    // if (jobSiteCrews !== null) {
    //   dispatch(loadJobSiteCrew(1, searchText, sort, direction, 5));
    // }
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
      <Col md={12}>
        <Card>
          <Card.Header>
            List of Project Crew
            <NavLink to="/private/job-site-crews/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Project Crew
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
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('Companies.name')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Companie Name', 'Companies.name')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    {/* <th> */}
                    {/*  <span */}
                    {/*    onClick={() => onArrowClickHandler('Divisions.name')} */}
                    {/*    aria-hidden="true" */}
                    {/*  > */}
                    {/*    {renderHeaderTitle('Division Name', 'Divisions.name')} */}
                    {/*  </span> */}
                    {/* </th> */}
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('JobSites.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Project Name', 'JobSites.name')}
                      </span>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{renderJobSiteCrew()}</tbody>
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

export default JobSiteCrewList;
