import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadAuditReports } from '../../store/actions/audit_reports';
import { loadAnswers } from '../../store/actions/answers';
import { loadAuditReportAnswers } from '../../store/actions/audit_report_answers';
import { loadQuestions } from '../../store/actions/questions';
import CustomPagination from '../../components/CustomPagination';

const AuditReportAnswerList = () => {
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchAuditReports();
      fetchQuestions();
      fetchAuditReportAnswers();
      fetchAnswers();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const auditReportAnswers = useSelector(
    (state) => state.auditReportAnswers.auditReportAnswers
  );

  const pagination = useSelector(
    (state) => state.auditReportAnswers.pagination
  );
  useEffect(() => {}, []);

  const fetchQuestions = async () => {
    await dispatch(loadQuestions(1, searchText, sort, direction));
  };

  const fetchAuditReports = async () => {
    await dispatch(loadAuditReports(1, searchText, sort, direction));
  };
  const fetchAnswers = async () => {
    await dispatch(loadAnswers(1, searchText, sort, direction));
  };
  const fetchAuditReportAnswers = async () => {
    await dispatch(loadAuditReportAnswers(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(
      loadAuditReportAnswers(page + 1, searchText, sort, direction)
    );
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(
      loadAuditReportAnswers(page - 1, searchText, sort, direction)
    );
  };

  const renderTable = () => {
    return auditReportAnswers.map((auditReportAnswer) => {
      return (
        <tr key={auditReportAnswer.id}>
          <td>{auditReportAnswer.audit_report.name}</td>
          <td>{auditReportAnswer.question.name}</td>
          <td>{auditReportAnswer.answer.name}</td>
          <td>{auditReportAnswer.answer_value}</td>
          <td>{auditReportAnswer.comments}</td>
          <td>
            <Link
              to={`/private/audit-report-answers/view/${auditReportAnswer.id}`}
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
              to={`/private/audit-report-answers/edit/${auditReportAnswer.id}`}
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
          {/* http://localhost:3000/indusries/edit/1   */}
        </tr>
      );
    });
  };

  useEffect(() => {
    // console.log('inside useeffect');
    fetchAuditReportAnswers();
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
            List of Audit Report Answer
            <NavLink to="/private/audit-report-answers/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Audit Task Categories
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
                        onClick={() => onArrowClickHandler('audit_report_id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Audit Report', 'audit_report_id')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('question_id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Question', 'question_id')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('answer_id')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Answer', 'answer_id')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('answer_value')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Answer Value', 'answer_value')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('comment')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Comment', 'comment')}
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

export default AuditReportAnswerList;
