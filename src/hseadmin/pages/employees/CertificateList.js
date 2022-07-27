import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
// import { NavLink } from 'react-router-dom';
// import TVIcon from '@mui/icons-material/Tv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { fetchDELETE, fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import NewCertificate from './NewCertificate';
import EditCertificateModal from './EditCertificateModal';
import { toMMDDYYYY } from '../../utils/Utils';
import CustomDataTable from '../../components/CustomDataTable';

export default function CertificateList(props) {
  const [loading, setLoading] = useState(false);

  const { employeeId } = props;

  console.log('employeeId', employeeId);

  const [certificates, setCertificates] = useState([]);
  // const [loading, setLoading] = useState(false);

  const [selectedCertificateId, setSelectedCertificateId] = useState(-1);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log('==============Show Edit Form:', showEditForm);
  console.log('==============Show Edit Form:', showAddForm);

  const COLUMNS = [
    { field: 'name', headerName: 'Certificate Name', width: 200 },
    {
      field: 'start_date',
      headerName: 'Issue Date',
      width: 140,
      renderCell: (params) => {
        const { start_date: date } = params.row;
        return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
      },
    },
    {
      field: 'end_date',
      headerName: 'Expiration Date',
      width: 140,
      renderCell: (params) => {
        const { end_date: date } = params.row;
        return <span> {`${date ? toMMDDYYYY(date) : ''}`}</span>;
      },
    },
    {
      field: 'document',
      headerName: 'Document',
      width: 150,
      valueFormatter: (params) => {
        return params.value ? params.value.url : '';
      },
      renderCell: (params) => {
        // return <span> {params.row.document.name}</span>;
        const { document } = params.row;
        // return <span>{document && document.name}</span>;
        return (
          <>
            <a href={document.url} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFilePdf} size="2x" /> {document.name}
            </a>
          </>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          // component={NavLink}
          // to={`edit/${params.row.id}`}
          label="Edit"
          onClick={() => {
            handleShow();
            setShowEditForm(true);
            setSelectedCertificateId(params.row.id);
          }}
        />,
        <GridActionsCellItem
          // component={NavLink}
          // to={`view/${params.row.id}`}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            deleteCertificate(params.row.id);
          }}
        />,
      ],
    },
  ];

  // to handle modal
  // const [showCertificateModal, setShowCertificateModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowAddForm(false);
    setShowEditForm(false);
    fetchCertificates();
  };

  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (selectedCertificateId !== -1) handleShow();
  }, [selectedCertificateId]);

  // const { id: employeeId } = useParams();

  useEffect(() => {
    // console.log('inside useEffect search text box');
    console.log(certificates);
    console.log(setSelectedCertificateId);
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      console.log(employeeId);
      let url = `${URLConstants.CERTIFICATES_URL}?limit=100&page=1`;

      if (employeeId !== -1 && employeeId !== undefined) {
        url = `${url}&employee_id=${employeeId}`;
      }
      const response = await fetchGET(url);

      setCertificates(response.data);
      setLoading(false);
      // props.resetReloadItems();
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  // const onCertificateUploadedHandler = async (documentId) => {
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
  //     fetchCertificates();
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const deleteCertificate = async (certificateId) => {
    try {
      const url = `${URLConstants.GET_CERTIFICATE_URL}/${certificateId}.json`;
      const response = await fetchDELETE(url);
      console.log(response.data);

      fetchCertificates();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Certificates</Card.Title>
              <Button
                className="btn-md"
                variant="contained"
                color="primary"
                type="button"
                style={{ float: 'right', marginRight: '10px' }}
                // onClick={handleShow}
                onClick={() => {
                  handleShow();
                  setShowAddForm(true);
                }}
              >
                Add certificate
              </Button>
            </Card.Header>
            <Card.Body style={{ paddingLeft: '0px', paddingRight: '0px' }}>
              <Grid container>
                <Grid item xs={12}>
                  <CustomDataTable
                    columns={COLUMNS}
                    rows={certificates}
                    loading={loading}
                  />
                </Grid>
              </Grid>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleClose} style={{ zIndex: 10000 }}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAddForm && (
            <NewCertificate
              employeeId={employeeId}
              companyId={props.companyId}
              closeModal={handleClose}
            />
          )}
          {showEditForm && (
            <EditCertificateModal
              closeModal={handleClose}
              emplyeeId={employeeId}
              certificateId={selectedCertificateId}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}> */}
          {/*  Close */}
          {/* </Button> */}
          {/* <Button variant="primary" onClick={handleClose}> */}
          {/*  Save Changes */}
          {/* </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
