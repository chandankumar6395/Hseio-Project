import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { Link, NavLink, useParams } from 'react-router-dom';
import CustomSearchComponent from '../../components/CustomSearchComponent';
import { loadSampleCertificates } from '../../store/actions/sample_certificates';
import CustomPagination from '../../components/CustomPagination';

const SampleCertificatsList = () => {
  const { id: employeeId } = useParams();
  const dispatch = useDispatch();

  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const [expiredStartDate] = useState(null);
  const [expiredEndDate] = useState(null);

  const [expired] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      fetchCertificates();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, employeeId, sort, direction]);

  const certificates = useSelector(
    (state) => state.samplecertificate.samplecertificates
  );
  const pagination = useSelector((state) => state.samplecertificate.pagination);

  useEffect(() => {
    // fetchCertificates();
  }, [employeeId]);

  const fetchCertificates = async () => {
    try {
      if (pagination === null) {
        await dispatch(
          loadSampleCertificates(
            1,
            searchText,
            sort,
            direction,
            expired,
            expiredStartDate,
            expiredEndDate,
            employeeId
          )
        );
      } else {
        setPage(pagination.current_page);
        await dispatch(
          loadSampleCertificates(
            pagination.current_page,
            searchText,
            sort,
            direction,
            expired,
            expiredStartDate,
            expiredEndDate,
            employeeId
          )
        );
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const onSearchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const loadNextPage = async () => {
    setPage((prevState) => prevState + 1);

    try {
      await dispatch(
        loadSampleCertificates(
          page + 1,
          searchText,
          sort,
          direction,
          expired,
          expiredStartDate,
          expiredEndDate,
          employeeId
        )
      );
      // await dispatch(loadCertificates(page + 1, searchText, sort, direction));
    } catch (e) {
      // console.log(e);
    }
  };
  const loadPrevPage = async () => {
    setPage((prevState) => prevState - 1);
    try {
      // setLoading(true);
      await dispatch(
        loadSampleCertificates(
          page - 1,
          searchText,
          sort,
          direction,
          expired,
          expiredStartDate,
          expiredEndDate,
          employeeId
        )
      );
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      // console.log(e);
    }
  };

  const renderTable = () => {
    return certificates.map((certificate) => {
      return (
        <tr key={certificate.id}>
          {/* <td>{certificate.id}</td> */}
          <td>{certificate.name}</td>
          <td>{certificate.company.name}</td>
          <td>{certificate.content}</td>
          <td>
            {/* <Link to={`/certificates/view/${certificate.id}`} target="_blank"> */}

            <a href={certificate.document.url} target="_blank" rel="noreferrer">
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
            </a>
            <Link to={`/sample-certificates/edit/${certificate.id}`}>
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
            List of Certificate
            <NavLink to="/sample-certificates/add">
              <Button
                className="btn-md"
                variant="primary"
                type="button"
                style={{ float: 'right', marginRight: '10px' }}
              >
                Add Certificate
              </Button>
            </NavLink>
          </Card.Header>
          <Card.Body>
            <CustomPagination
              pagination={pagination}
              loadPrevPage={loadPrevPage}
              loadNextPage={loadNextPage}
            />
            <CustomSearchComponent onSearch={onSearchTextChangeHandler} />
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(' Name', '')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(' Company', '')}
                      </span>
                    </th>
                    <th>
                      <span
                        onClick={() => onArrowClickHandler('')}
                        aria-hidden="true"
                      >
                        {renderHeaderTitle(' Content', '')}
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

export default SampleCertificatsList;
