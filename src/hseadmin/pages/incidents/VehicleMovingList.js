import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { fetchDELETE, fetchGET } from '../../utils/NetworkUtils';
import URLConstants from '../../constants/URLConstants';
import CustomDataTable from '../../components/CustomDataTable';
import NewVehicleMovingAdd from './NewVehicleMovingAdd';
import EditVehicleMoving from './EditVehicleMoving';

export default function VehicleMovingList(props) {
  const [loading, setLoading] = useState(false);
  const [vehicleMoving, setvehicleMoving] = useState([]);
  const { incidentId, incidentTypeId } = props;

  console.log('incidentId', incidentId);

  // const [loading, setLoading] = useState(false);

  const [selectedVehicleMoveId, setSelectedVehicleMoveId] = useState(-1);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log('==============Show Edit Form:', showEditForm);
  console.log('==============Show Edit Form:', showAddForm);
  console.log('==============Show Edit Form:', showModal);

  const COLUMNS = [
    {
      field: 'employee',
      headerName: 'Employee',
      width: 150,
      valueFormatter: (params) => {
        const { value } = params;
        return `${value.user.first_name} ${value.user.last_name}`;
      },
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
      field: 'equipment',
      headerName: 'Equipment',
      width: 150,
      valueFormatter: (params) => {
        return params.value ? params.value.name : '';
      },
      renderCell: (params) => {
        const { equipment } = params.row;
        return <span>{equipment && equipment.name}</span>;
      },
    },
    { field: 'incident_description', headerName: 'Description', width: 200 },
    // { field: 'created', headerName: 'Created', width: 200 },
    // { field: 'modified', headerName: 'Modified', width: 200 },
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
            setSelectedVehicleMoveId(params.row.id);
          }}
        />,
        <GridActionsCellItem
          // component={NavLink}
          // to={`view/${params.row.id}`}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            deleteVehicleMoving(params.row.id);
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
    fetchVehicleMoving();
  };

  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (selectedVehicleMoveId !== -1) handleShow();
  }, [selectedVehicleMoveId]);

  // const { id: employeeId } = useParams();

  useEffect(() => {
    // console.log('inside useEffect search text box');
    console.log(selectedVehicleMoveId);
    fetchVehicleMoving();
  }, []);

  const fetchVehicleMoving = async () => {
    try {
      setLoading(true);
      console.log(incidentId);
      let url = `${URLConstants.INCIDENTS_VEHICLE_MOVING_URL}?limit=100&page=1`;

      if (incidentId !== -1 && incidentId !== undefined) {
        url = `${url}&incident_id=${incidentId}`;
      }
      const response = await fetchGET(url);

      setvehicleMoving(response.data);
      setLoading(false);
      // props.resetReloadItems();
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  const deleteVehicleMoving = async (incidentId) => {
    try {
      const url = `${URLConstants.GET_INCIDENTS_VEHICLE_MOVING_URL}/${incidentId}.json`;
      const response = await fetchDELETE(url);
      console.log(response.data);

      fetchVehicleMoving();
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
              <Card.Title>Vehicle Moving Details</Card.Title>
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
                Add Vehicle Moving
              </Button>
            </Card.Header>
            <Card.Body style={{ paddingLeft: '0px', paddingRight: '0px' }}>
              <Grid container>
                <Grid item xs={12}>
                  <CustomDataTable
                    columns={COLUMNS}
                    rows={vehicleMoving}
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
          <Modal.Title>Vehicle Moving Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAddForm && (
            <NewVehicleMovingAdd
              incidentId={incidentId}
              incidentTypeId={incidentTypeId}
              closeModal={handleClose}
            />
          )}
          {showEditForm && (
            <EditVehicleMoving
              incidentId={incidentId}
              incidentTypeId={incidentTypeId}
              vehicleMovingId={selectedVehicleMoveId}
              closeModal={handleClose}
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
