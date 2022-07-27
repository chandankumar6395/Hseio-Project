import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink, useParams } from 'react-router-dom';
import { loadAuditTasks } from '../../store/actions/audit_tasks';
import CustomPagination from '../../components/CustomPagination';

const AuditTaskList = () => {
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
    fetchAuditTasks();
    console.log('AuditTaskList useEffect ', localDivisionId);
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
      fetchAuditTasks();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction, companyId]);

  const auditTasks = useSelector((state) => state.auditTask.auditTasks);
  const pagination = useSelector((state) => state.auditTask.pagination);

  useEffect(() => {
    // fetchAuditTask();
  }, [companyId]);

  const fetchAuditTasks = async () => {
    await dispatch(
      loadAuditTasks(1, searchText, sort, direction, companyId, localDivisionId)
    );
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadAuditTasks(
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
      loadAuditTasks(
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
    return auditTasks.map((auditTask) => {
      return (
        <tr key={auditTask.id}>
          {/* <td>{auditTask.id}</td> */}
          <td>{auditTask.name}</td>
          <td>{auditTask.short_desc}</td>
          <td>{auditTask.long_desc}</td>
          {/* <td>{auditTask.supervisor_employee_id != null ? employee.parent_industry.name : ''}</td> */}
          <td>{auditTask.company !== null ? auditTask.company.name : ''}</td>
          {/* <td>{auditTask.company.name}</td> */}
          <td>{auditTask.division !== null ? auditTask.division.name : ''}</td>
          <td>{auditTask.job_site !== null ? auditTask.job_site.name : ''}</td>
          <td>
            {auditTask.audit_type !== null ? auditTask.audit_type.name : ''}
          </td>

          <td>
            <Link to={`/audit-tasks/view/${auditTask.id}`}>
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
            <Link to={`/audit-tasks/edit/${auditTask.id}`}>
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
            List of Audit Task
            <NavLink to="/audit-tasks/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Audit Task
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
                    {/* <th> Desc</th> */}
                    {/* <th>Supervisor Employee Id</th> */}
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
                        {renderHeaderTitle('Description', 'long_desc')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('Company.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Company Name', 'Company.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('division.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Division Name', 'division.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('jobSite.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Project Name', 'jobSite.name')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('audit_type.name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Audit Type', 'audit_type.name')}
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

export default AuditTaskList;
