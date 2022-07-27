import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
// eslint-disable-next-line import/named
import CustomSearchComponent from '../../components/CustomSearchComponent';
import { loadAuditReports } from '../../store/actions/audit_reports';
import CustomPagination from '../../components/CustomPagination';

const AuditReportList = () => {
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      fetchAuditReports();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const auditReports = useSelector((state) => state.auditReport.auditReports);
  const pagination = useSelector((state) => state.address.pagination);

  useEffect(() => {
    // fetchAuditReports();
  }, [sort, direction]);

  const fetchAuditReports = async () => {
    if (pagination === null) {
      await dispatch(loadAuditReports(1, searchText, sort, direction));
    } else {
      setPage(pagination.current_page);
      await dispatch(
        loadAuditReports(pagination.current_page, searchText, sort, direction)
      );
    }
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadAuditReports(page + 1, searchText, sort, direction));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadAuditReports(page - 1, searchText, sort, direction));
  };

  const renderTable = () => {
    return auditReports.map((auditReport) => {
      return (
        <tr key={auditReport.id}>
          <td>{auditReport.id}</td>
          <td>{auditReport.name}</td>
          <td>{auditReport.audit_task.name}</td>
          <td>{auditReport.contactor_name}</td>
          <td>{auditReport.city_name}</td>
          <td>{auditReport.user.name}</td>
          <td>{auditReport.auditor_name}</td>

          <td>
            <Link to={`/audit-reports/view/${auditReport.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>

            <Link to={`/audit-reports/edit/${auditReport.id}`}>
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
            List of Audit Report
            <NavLink to="/audit-reports/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Audit Report
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
            {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
            {/*  <Form.Control */}
            {/*    required */}
            {/*    type="text" */}
            {/*    placeholder="Search by name" */}
            {/*    onChange={onSearchTextChangeHandler} */}
            {/*  /> */}
            {/* </Form.Group> */}

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
                        onClick={() => onArrowClickHandler('audit task')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Audit Task', 'audit task')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('contactor name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Contactor Name', 'contactor name')}
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
                        onClick={() => onArrowClickHandler('auditor')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Auditor', 'auditor')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('auditor name')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Auditor Name', 'auditor name')}
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
        </Card>
      </Col>
    </Row>
  );
};

export default AuditReportList;
