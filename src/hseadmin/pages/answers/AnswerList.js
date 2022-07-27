import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import { loadAnswers } from '../../store/actions/answers';
import CustomPagination from '../../components/CustomPagination';

const AnswerList = () => {
  const { id: companyId } = useParams();
  console.log(`---------->${JSON.stringify(companyId)}`);

  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // console.log('inside useEffect search text box');

    const timer = setTimeout(async () => {
      fetchAnswers();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const answers = useSelector((state) => state.answer.answers);
  const pagination = useSelector((state) => state.division.pagination);

  useEffect(() => {
    // fetchDivisions();
  }, []);

  const fetchAnswers = async () => {
    await dispatch(loadAnswers(1, searchText, sort, direction));
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);
    await dispatch(loadAnswers(page + 1, searchText, sort, direction));
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    await dispatch(loadAnswers(page - 1, searchText, sort, direction));
  };

  const renderTable = () => {
    return answers.map((answer) => {
      return (
        <tr key={answer.id}>
          <td>{answer.id}</td>
          <td>{answer.name}</td>
          <td>{answer.question.name}</td>
          <td>{answer.label}</td>
          <td>{answer.value}</td>
          <td>{answer.correct_value}</td>
          <td>
            <Link to={`/answers/view/${answer.id}`}>
              <Button
                variant="dark"
                size="sm"
                style={{ marginBottom: '4px', marginRight: '4px' }}
              >
                View
              </Button>
            </Link>

            <Link to={`/answers/edit/${answer.id}`}>
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
    // fetchAnswers();
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
            List of Answers
            <NavLink to="/answers/add">
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                style={{ float: 'right' }}
              >
                Add Answer
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
                        onClick={() => onArrowClickHandler('question')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Question', 'question')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('label')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Label', 'label')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('value')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Value', 'value')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('correct value')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle('Correct Value', 'correct value')}
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

export default AnswerList;
