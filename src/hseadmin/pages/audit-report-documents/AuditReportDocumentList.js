import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import { loadAuditReportDocument } from '../../store/actions/audit_report_documents';
import * as auditReportDocuments from 'react-bootstrap/ElementChildren';
import CustomPagination from '../../components/CustomPagination';

const AuditReportDocumentList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {}, [sort, direction]);

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
      fetchAuditReportDocument();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);
  useSelector((state) => state.auditReportDocument.auditReportDocuments);
  const pagination = useSelector((state) => state.jobSite.pagination);

  useEffect(() => {}, []);

  const fetchAuditReportDocument = async () => {
    await dispatch(loadAuditReportDocument(1, searchText, sort, direction, 5));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadAuditReportDocument(page + 1, searchText, sort, direction, 5)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadAuditReportDocument(page - 1, searchText, sort, direction, 5)
    );
  };
  const renderTable = () => {
    return auditReportDocuments.map((auditReportDocument) => {
      return (
        <tr key={auditReportDocument.id}>
          <td>{auditReportDocument.id}</td>
          <td>{auditReportDocument.audit_report.id}</td>
          <td>{auditReportDocument.document_id}</td>
          <td>
            <Link to={`/audit-report-documents/view/${auditReportDocument.id}`}>
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
            <Link to={`/audit-report-documents/edit/${auditReportDocument.id}`}>
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
            List of Audit Report Document
            <NavLink to="/audit-report-documents/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Audit Report Document
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
                        onClick={() => onArrowClickHandler('audit_report_id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(
                          'Audit_Report_id',
                          'audit_report_id'
                        )}
                      </span>
                    </th>

                    <th>
                      <span
                        onClick={() => onArrowClickHandler('document_id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Document_id', 'document_id')}
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
export default AuditReportDocumentList;
