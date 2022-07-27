import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { fetchDELETE, fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import NewAlcoholDrugs from './NewAlcoholDrugs';
import EditAlcoholDrugs from './EditAlcoholDrugs';
import { toMMDDYYYYHHMMDisplay } from '../../utils/Utils';
import CustomDataTable from '../../components/CustomDataTable';
import { ALCOHOL_DRUG_STATUSES, YES_NO_DATA } from '../../constants/Constants';

export default function AlcoholDrugList(props) {
  const { employeeId } = props;

  console.log('employeeId', employeeId);

  const [alcoholDrug, setAlcoholDrug] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedAlcoholDrugId, setSelectedAlcoholDrugId] = useState(-1);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log('==============Show Edit Form:', showEditForm);
  console.log('==============Show Edit Form:', showAddForm);

  const COLUMNS = [
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'negative_test',
      headerName: 'Negative Test',
      width: 140,
      valueFormatter: (params) => {
        return params.value === 1 ? 'YES' : 'NO';
      },
      renderCell: (params) => {
        const { negative_test: negativeTest } = params.row;
        return (
          <span> {YES_NO_DATA.find((x) => x.id === negativeTest).name}</span>
        );
      },
    },
    {
      field: 'test_performed_date',
      headerName: 'Test Performed Date',
      width: 160,
      renderCell: (params) => {
        const { test_performed_date: date } = params.row;
        return <span> {`${date ? toMMDDYYYYHHMMDisplay(date) : ''}`}</span>;
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
        const { documents } = params.row;
        // return <span>{document && document.name}</span>;
        return (
          <>
            {documents.map((documents) => {
              return (
                <a href={documents.url} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faFilePdf} size="2x" />{' '}
                  {documents.name}
                </a>
              );
            })}
          </>
        );
      },
    },
    {
      field: 'alcohol_drug_status',
      headerName: 'Alcohol Drug Status',
      width: 140,
      valueFormatter: (params) => {
        return params.value.name;
      },
      renderCell: (params) => {
        const { alcohol_drug_status_id: alcoholDrugStatusId } = params.row;
        return (
          <span>
            {' '}
            {alcoholDrugStatusId
              ? ALCOHOL_DRUG_STATUSES.find((x) => x.id === alcoholDrugStatusId)
                  .name
              : ''}
          </span>
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
          label="Edit"
          onClick={() => {
            handleShow();
            setShowEditForm(true);
            setSelectedAlcoholDrugId(params.row.id);
          }}
        />,
        <GridActionsCellItem
          // component={NavLink}
          // to={`view/${params.row.id}`}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            deleteAlcoholDrug(params.row.id);
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
    fetchAlcoholDrugs();
  };

  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (selectedAlcoholDrugId !== -1) handleShow();
  }, [selectedAlcoholDrugId]);

  // const { id: employeeId } = useParams();

  useEffect(() => {
    // console.log('inside useEffect search text box');
    console.log(alcoholDrug);
    console.log(setSelectedAlcoholDrugId);
    fetchAlcoholDrugs();
  }, []);

  const fetchAlcoholDrugs = async () => {
    try {
      setLoading(true);
      console.log(employeeId);
      let url = `${URLConstants.ALCOHOL_DRUG_URL}?limit=100&page=1`;

      if (employeeId !== -1 && employeeId !== undefined) {
        url = `${url}&employee_id=${employeeId}`;
      }
      const response = await fetchGET(url);

      setAlcoholDrug(response.data);
      setLoading(false);
      // props.resetReloadItems();
    } catch (error) {
      toast(error.message || 'Failed');
      setLoading(false);
    }
  };

  const deleteAlcoholDrug = async (alcoholDrugId) => {
    try {
      const url = `${URLConstants.GET_ALCOHOL_DRUG_URL}/${alcoholDrugId}.json`;
      const response = await fetchDELETE(url);
      console.log(response.data);

      fetchAlcoholDrugs();
    } catch (error) {
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

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Substance Screening</Card.Title>
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
                Add Substance Screening
              </Button>
            </Card.Header>
            <Card.Body style={{ paddingLeft: '0px', paddingRight: '0px' }}>
              <Grid container>
                <Grid item xs={12}>
                  <CustomDataTable
                    columns={COLUMNS}
                    rows={alcoholDrug}
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
          <Modal.Title>Upload Substance Screening Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAddForm && (
            <NewAlcoholDrugs employeeId={employeeId} closeModal={handleClose} />
          )}
          {showEditForm && (
            <EditAlcoholDrugs
              employeeId={employeeId}
              alcoholDrugId={selectedAlcoholDrugId}
              closeModal={handleClose}
            />
          )}
          {/* )} */}
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
