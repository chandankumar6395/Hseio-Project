import React, { useEffect, useState } from 'react';

// import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import { GridActionsCellItem } from '@mui/x-data-grid-pro';
// import EditIcon from '@mui/icons-material/Edit';
// import TVIcon from '@mui/icons-material/Tv';
import { toast } from 'react-toastify';
import { Form, Modal } from 'react-bootstrap';
import { fetchGET, fetchPOST, fetchPUT } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';
import {
  getCurrentDateTime,
  toMMDDYYYYHHMMDisplay,
  toServerDateTime,
} from '../../utils/Utils';
import { CustomDivider } from '../../utils/MUIStyle';
import EmployeeSelect from '../../components/widgets/EmployeeSelect';
import AddSignatureForm from './AddSignatureForm';
import AddPhotoForm from './AddPhotoForm';

const TrainingEventEmployeeListTable = (props) => {
  const { trainingEvent } = props;

  const [loading, setLoading] = useState(false);

  const [trainingEventEmployees, setTrainingEventEmployees] = useState([]);

  const [employeeId, setEmployeeId] = useState(-1);

  const [trainingEventEmployeeId, setTrainingEventEmployeeId] = useState(-1);

  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);

  const [showAddSignatureForm, setShowAddSignatureForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShowAddPhotoForm(false);
    setShowAddSignatureForm(false);
    fetchTrainingEventEmployee();
  };
  const handleShow = () => setShowModal(true);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    {
      field: 'training_event',
      headerName: 'Training Event',
      width: 90,
      renderCell: (params) => {
        return <span> {params.row.training_event.name}</span>;
      },
    },
    {
      field: 'employee',
      headerName: 'Employee',
      width: 150,

      renderCell: (params) => {
        const { employee } = params.row;
        return (
          <span>
            {employee &&
              `${employee.user.first_name} ${employee.user.last_name}`}
          </span>
        );
      },
    },
    {
      field: 'primary_photo',
      headerName: 'Primary Photo',
      renderCell: (params) => {
        const { primary_photo: primaryPhoto } = params.row;

        return (
          <>
            {primaryPhoto && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <img
                  style={{
                    width: '50px',
                    height: 'auto',
                    alignItems: 'center',
                    backgroundColor: 'lightgrey',
                  }}
                  src={primaryPhoto ? primaryPhoto.url : ''}
                  alt=""
                />
              </div>
            )}
            {!primaryPhoto && (
              <>
                {' '}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    setShowAddPhotoForm(true);
                    setTrainingEventEmployeeId(params.row.id);
                    handleShow();
                  }}
                >
                  <AddIcon />
                  Photo
                </Button>
              </>
            )}
          </>
        );
      },
    },
    {
      field: 'signature',
      headerName: 'Signature',
      width: 150,
      renderCell: (params) => {
        const { signature } = params.row;
        return (
          <>
            {signature && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Button
                  onClick={() => {
                    setShowAddSignatureForm(true);
                    setTrainingEventEmployeeId(params.row.id);
                    handleShow();
                  }}
                  type="button"
                >
                  <img
                    style={{
                      width: '50px',
                      height: 'auto',
                      alignItems: 'center',
                      backgroundColor: 'white',
                    }}
                    src={signature ? signature.url : ''}
                    alt=""
                  />
                </Button>
              </div>
            )}
            {!signature && (
              <>
                {' '}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    setShowAddSignatureForm(true);
                    setTrainingEventEmployeeId(params.row.id);
                    handleShow();
                  }}
                >
                  <AddIcon />
                  Signature
                </Button>
              </>
            )}
          </>
        );
      },
    },

    // {
    //   field: 'training_course',
    //   headerName: 'Training Course',
    //   width: 90,
    //   renderCell: (params) => {
    //     return <span> {params.row.training_course.name}</span>;
    //   },
    // },
    {
      field: 'certificate',
      headerName: 'Certificate',
      width: 90,
      hide: true,
      renderCell: (params) => {
        const { certificate } = params.row;
        return <span>{certificate ? certificate.name : ''}</span>;
      },
    },
    // {
    //   field: 'training_event_employee_status',
    //   headerName: 'Status',
    //   width: 150,
    //   renderCell: (params) => {
    //     return <span> {params.row.training_event_employee_status.name}</span>;
    //   },
    // },
    {
      field: 'training_event_employee_status',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        const status = params.row.training_event_employee_status;
        console.log('----->', status);
        return (
          <>
            {status.id === 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  try {
                    const postData = {
                      id: trainingEventEmployeeId,
                      training_event_employee_status_id: 2,
                    };
                    // await dispatch(addJobWorkAuthorizations(data));
                    const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_URL}/${params.row.id}.json`;

                    console.log('addJobWorkAuthorizations url =', url);

                    const response = await fetchPUT(url, postData);
                    console.log(response.data);

                    fetchTrainingEventEmployee();
                  } catch (error) {
                    toast(error.message || 'Failed');
                  }
                }}
              >
                Start Training
              </Button>
            )}
            {status.id === 2 && (
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  try {
                    const postData = {
                      id: trainingEventEmployeeId,
                      training_event_employee_status_id: 3,
                      completion_date: toServerDateTime(getCurrentDateTime()),
                    };
                    // await dispatch(addJobWorkAuthorizations(data));
                    const url = `${URLConstants.GET_TRAINING_EVENT_EMPLOYEE_URL}/${params.row.id}.json`;

                    console.log('addJobWorkAuthorizations url =', url);

                    const response = await fetchPUT(url, postData);
                    console.log(response.data);

                    fetchTrainingEventEmployee();
                  } catch (error) {
                    toast(error.message || 'Failed');
                  }
                }}
              >
                Mark Complete
              </Button>
            )}
            {status.id === 3 && <span>Completed</span>}
          </>
        );
      },
    },
    {
      field: 'completion_date',
      headerName: 'Completion Date',
      width: 150,
      renderCell: (params) => {
        // eslint-disable-next-line camelcase
        const { completion_date: completionDate } = params.row;
        // eslint-disable-next-line camelcase
        return (
          // eslint-disable-next-line camelcase
          <span>
            {' '}
            {`${completionDate ? toMMDDYYYYHHMMDisplay(completionDate) : ''}`}
          </span>
        );
      },
    },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   width: 100,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={<EditIcon />}
    //       component={NavLink}
    //       to={`edit/${params.row.id}`}
    //       label="Edit"
    //     />,
    //     <GridActionsCellItem
    //       component={NavLink}
    //       to={`view/${params.row.id}`}
    //       icon={<TVIcon />}
    //       label="View"
    //     />,
    //   ],
    // },
  ];

  const fetchTrainingEventEmployee = async () => {
    try {
      setLoading(true);
      const response = await fetchGET(
        `${URLConstants.TRAINING_EVENT_EMPLOYEES_URL}?limit=100&page=1`
      );

      setTrainingEventEmployees(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  useEffect(() => {
    fetchTrainingEventEmployee();
  }, []);

  return (
    <>
      <Helmet title="Edit Training Event" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Add Employee
          </Typography>
          <Grid item>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Employee</Form.Label>
              <EmployeeSelect
                params={{
                  url: URLConstants.EMPLOYEES_URL,
                }}
                onChange={(value) => {
                  setEmployeeId(value);
                }}
              />
            </Form.Group>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  if (employeeId !== -1) {
                    try {
                      const postData = {
                        training_event_id: trainingEvent.id,
                        employee_id: employeeId,
                        training_event_employee_status_id: 1,
                      };
                      const url = URLConstants.TRAINING_EVENT_EMPLOYEES_URL;
                      await fetchPOST(url, postData);

                      await fetchTrainingEventEmployee();
                    } catch (error) {
                      console.log(error.message);
                    }
                  }
                }}
              >
                <AddIcon />
                Add Employee
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomDataTable
            columns={COLUMNS}
            rows={trainingEventEmployees}
            loading={loading}
          />
        </Grid>
      </Grid>
      <Modal
        style={{ zIndex: '1000000' }}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Signature Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAddSignatureForm && (
            <AddSignatureForm
              closeModal={handleClose}
              trainingEventEmployeeId={trainingEventEmployeeId}
            />
          )}
          {showAddPhotoForm && (
            <AddPhotoForm
              closeModal={handleClose}
              trainingEventEmployeeId={trainingEventEmployeeId}
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
};

export default TrainingEventEmployeeListTable;
