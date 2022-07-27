/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row, Table } from 'react-bootstrap';
// import { Button } from '@mui/material';
import CustomPagination from '../../components/CustomPagination';
import CustomSearchComponent from '../../components/CustomSearchComponent';
import { loadDocumentList } from '../../store/actions/documents';
// import NewDocument from './NewDocument';
// import { fetchPUT } from '../../utils/NetworkUtils';
// import URLConstants from '../../constants/URLConstants';

const DocumentList = (props) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState('name');
  const [direction, setDirection] = useState('asc');

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  // to handle modal
  // const [showDocumentModal, setShowDocumentModal] = useState(false);
  // const handleClose = () => setShowDocumentModal(false);
  // const handleShow = () => setShowDocumentModal(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      fetchDocumentList();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, sort, direction]);

  const documents = useSelector((state) => state.document.documents);
  const pagination = useSelector((state) => state.document.pagination);

  const fetchDocumentList = async () => {
    try {
      await dispatch(
        loadDocumentList(
          1,
          searchText,
          sort,
          direction,
          props.columnName,
          props.value
        )
      );
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
        loadDocumentList(
          page + 1,
          searchText,
          sort,
          direction,
          props.columnName,
          props.value
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
        loadDocumentList(
          page - 1,
          searchText,
          sort,
          direction,
          props.columnName,
          props.value
        )
      );
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      // console.log(e);
    }
  };

  const renderTable = () => {
    // eslint-disable-next-line camelcase,no-undef
    return documents.map((document) => {
      return (
        <tr key={document.id}>
          <td>{document.id}</td>
          <td>{document.name}</td>
          {/* <td>{document.file_name}</td> */}
          {/* <td>{document.mime_type}</td> */}
          {/* <td>{document.extension}</td> */}
          {/* <td>{document.size}</td> */}
          {/* <td>{document.path}</td> */}
          <td>
            <a href={document.url} target="_blank" rel="noreferrer">
              Download
            </a>
          </td>
          {/* <td> */}
          {/*  <Link to={`/documents/view/${document.id}`}> */}
          {/*    <Button */}
          {/*      variant="contained" */}
          {/*      color="primary" */}
          {/*      size="sm" */}
          {/*      style={{ marginBottom: '4px', marginRight: '4px' }} */}
          {/*    > */}
          {/*      View */}
          {/*    </Button> */}
          {/*  </Link> */}
          {/* </td> */}
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

  // const onDocumentUploadedHandler = async (documentId) => {
  //   try {
  //     const url = `${URLConstants.DOCUMENTS_URL}/${documentId}.json`;
  //     const data = {
  //       id: documentId,
  //       [props.tableName]: [
  //         {
  //           id: props.value,
  //         },
  //       ],
  //     };
  //     const response = await fetchPUT(url, data);
  //     handleClose();
  //     fetchDocumentList();
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              Documents
              {/* <Button */}
              {/*  className="btn-md" */}
              {/*  variant="contained" */}
              {/*  color="primary" */}
              {/*  type="button" */}
              {/*  style={{ float: 'right', marginRight: '10px' }} */}
              {/*  onClick={handleShow} */}
              {/* > */}
              {/*  Add Document */}
              {/* </Button> */}
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
                          {renderHeaderTitle(' Name', 'name')}
                        </span>
                      </th>
                      {/* <th> */}
                      {/*  <span */}
                      {/*    onClick={() => onArrowClickHandler('file_name')} */}
                      {/*    aria-hidden="true" */}
                      {/*  > */}
                      {/*    {renderHeaderTitle('File Name', 'file_name')} */}
                      {/*  </span> */}
                      {/* </th> */}
                      {/* <th> */}
                      {/*  <span */}
                      {/*    onClick={() => onArrowClickHandler('mime_type')} */}
                      {/*    aria-hidden="true" */}
                      {/*  > */}
                      {/*    {renderHeaderTitle('Mime Type', 'mime_type')} */}
                      {/*  </span> */}
                      {/* </th> */}
                      {/* <th> */}
                      {/*  <span */}
                      {/*    onClick={() => onArrowClickHandler('extension')} */}
                      {/*    aria-hidden="true" */}
                      {/*  > */}
                      {/*    {renderHeaderTitle('Extension', 'extension')} */}
                      {/*  </span> */}
                      {/* </th> */}
                      {/* <th> */}
                      {/*  <span */}
                      {/*    onClick={() => onArrowClickHandler('size')} */}
                      {/*    aria-hidden="true" */}
                      {/*  > */}
                      {/*    {renderHeaderTitle('Size', 'size')} */}
                      {/*  </span> */}
                      {/* </th> */}
                      {/* <th> */}
                      {/*  <span */}
                      {/*    onClick={() => onArrowClickHandler('path')} */}
                      {/*    aria-hidden="true" */}
                      {/*  > */}
                      {/*    {renderHeaderTitle('Path', 'path')} */}
                      {/*  </span> */}
                      {/* </th> */}
                      <th>Download</th>
                      {/* <th> */}
                      {/*  <span */}
                      {/*    onClick={() => */}
                      {/*      onArrowClickHandler('document_status_id') */}
                      {/*    } */}
                      {/*    aria-hidden="true" */}
                      {/*  > */}
                      {/*    {renderHeaderTitle( */}
                      {/*      'Document_status_id', */}
                      {/*      'document_status_id' */}
                      {/*    )} */}
                      {/*  </span> */}
                      {/* </th> */}
                      {/* <th>Action</th> */}
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
              {/* <Pagination> */}
              {/*    {(pagination != null && pagination.has_prev_page === true) && */}
              {/*        <Pagination.Prev onClick={loadPrevPage}/>} */}
              {/*    {pagination !=null && pagination.page_count !==1 && (<Pagination.Item disabled>{pagination.current_page}</Pagination.Item>)} */}
              {/*    {(pagination != null && pagination.has_next_page === true) && */}
              {/*        <Pagination.Next onClick={loadNextPage}/>} */}

              {/* </Pagination> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Modal */}
      {/*  show={showDocumentModal} */}
      {/*  onHide={handleClose} */}
      {/*  style={{ zIndex: 10000 }} */}
      {/* > */}
      {/*  <Modal.Header closeButton> */}
      {/*    <Modal.Title>Upload Document</Modal.Title> */}
      {/*  </Modal.Header> */}
      {/*  <Modal.Body> */}
      {/*    <NewDocument onDocumentUpload={onDocumentUploadedHandler} /> */}
      {/*  </Modal.Body> */}
      {/*  <Modal.Footer> */}
      {/*    /!* <Button variant="secondary" onClick={handleClose}> *!/ */}
      {/*    /!*  Close *!/ */}
      {/*    /!* </Button> *!/ */}
      {/*    /!* <Button variant="primary" onClick={handleClose}> *!/ */}
      {/*    /!*  Save Changes *!/ */}
      {/*    /!* </Button> *!/ */}
      {/*  </Modal.Footer> */}
      {/* </Modal> */}
    </>
  );
};

export default DocumentList;
