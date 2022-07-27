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
import NewInjuryIllness from './NewInjuryIllness';
import EditInjuryIllness from './EditInjuryIllness';
import { YES_NO_DATA } from '../../constants/Constants';

export default function InjuryIllnessList(props) {
  const [loading, setLoading] = useState(false);
  const [injuries, setInjuries] = useState([]);
  const { incidentId, companyId, divisionId, jobsiteId } = props;

  console.log('incidentId', incidentId);

  // const [loading, setLoading] = useState(false);

  const [selectedinIuriesId, setselectedinIuriesId] = useState(-1);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log('==============Show Edit Form:', showEditForm);
  console.log('==============Show Edit Form:', showAddForm);
  console.log('==============Show Edit Form:', showAddForm);

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
      field: 'injury_class',
      headerName: 'Injuries Class',
      width: 150,
      valueFormatter: (params) => {
        return params.value ? params.value.name : '';
      },

      renderCell: (params) => {
        // eslint-disable-next-line camelcase
        const { injury_class } = params.row;
        // eslint-disable-next-line camelcase
        return <span>{injury_class && injury_class.name}</span>;
      },
    },
    {
      field: 'osha_recordable',
      headerName: 'Osha Recordable',
      width: 90,
      valueFormatter: (params) => {
        return params.value === 1 ? 'YES' : 'NO';
      },
      renderCell: (params) => {
        // eslint-disable-next-line camelcase
        const { osha_recordable } = params.row;
        return (
          // eslint-disable-next-line camelcase
          <span>{YES_NO_DATA.find((x) => x.id === osha_recordable).name}</span>
        );
      },
    },
    {
      field: 'fatility',
      headerName: 'Fatility',
      width: 90,
      valueFormatter: (params) => {
        return params.value === 1 ? 'YES' : 'NO';
      },
      renderCell: (params) => {
        const { fatility } = params.row;
        console.log('---->', YES_NO_DATA.find((x) => x.id === fatility).name);
        return <span>{YES_NO_DATA.find((x) => x.id === fatility).name}</span>;
      },
    },
    {
      field: 'lost_time',
      headerName: 'Lost Time',
      width: 90,
      valueFormatter: (params) => {
        return params.value === 1 ? 'YES' : 'NO';
      },
      renderCell: (params) => {
        const { lost_time: lostTime } = params.row;
        return <span>{YES_NO_DATA.find((x) => x.id === lostTime).name}</span>;
      },
    },
    { field: 'lost_time_total_days', headerName: 'Total Days', width: 100 },
    {
      field: 'restricted_duty',
      headerName: 'Restricted Duty',
      width: 90,
      valueFormatter: (params) => {
        return params.value === 1 ? 'YES' : 'NO';
      },
      renderCell: (params) => {
        const { restricted_duty: restrictedDuty } = params.row;
        return (
          <span>{YES_NO_DATA.find((x) => x.id === restrictedDuty).name}</span>
        );
      },
    },
    {
      field: 'restricted_duty_total_days',
      headerName: 'Total Days',
      width: 100,
    },
    // {
    //   field: 'body_parts',
    //   headerName: 'Body Parts',
    //   width: 100,
    //   renderCell: (params) => {
    //     // eslint-disable-next-line camelcase
    //     const { body_parts } = params.row;
    //     // eslint-disable-next-line camelcase
    //     return <span>{body_parts && body_parts.name}</span>;
    //   },
    // },
    {
      field: 'body_parts',
      headerName: 'Body Parts',
      width: 150,
      valueFormatter: (params) => {
        return params.value ? params.value.name : '';
      },
      renderCell: (params) => {
        const bodyParts = params.row.body_parts;
        return bodyParts.map((bodyParts) => <span>{bodyParts.name},</span>);
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
            setselectedinIuriesId(params.row.id);
          }}
        />,
        <GridActionsCellItem
          // component={NavLink}
          // to={`view/${params.row.id}`}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            deleteIncidentInjurie(params.row.id);
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
    fetchIncidentInjuries();
  };

  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (selectedinIuriesId !== -1) handleShow();
  }, [selectedinIuriesId]);

  // const { id: employeeId } = useParams();
  const fetchIncidentInjuries = async () => {
    try {
      setLoading(true);
      console.log(incidentId);
      let url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}.json?limit=100&page=1`;

      if (incidentId !== -1 && incidentId !== undefined) {
        url = `${url}&incident_id=${incidentId}`;
      }
      const response = await fetchGET(url);

      setInjuries(response.data);
      setLoading(false);
      // props.resetReloadItems();
    } catch (error) {
      setLoading(false);
      toast(error.message || 'Failed');
    }
  };

  useEffect(() => {
    // console.log('inside useEffect search text box');
    console.log(setselectedinIuriesId);
    fetchIncidentInjuries();
  }, []);

  const deleteIncidentInjurie = async (incidentId) => {
    try {
      const url = `${URLConstants.GET_INCIDENTS_INJURIES_URL}/${incidentId}.json`;
      const response = await fetchDELETE(url);
      console.log(response.data);

      fetchIncidentInjuries();
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
              <Card.Title>Injury Illness Details</Card.Title>
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
                Add Injury/Illness Details
              </Button>
            </Card.Header>
            <Card.Body style={{ paddingLeft: '0px', paddingRight: '0px' }}>
              <Grid container>
                <Grid item xs={12}>
                  <CustomDataTable
                    columns={COLUMNS}
                    rows={injuries}
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
          <Modal.Title>Injury/Illness Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAddForm && (
            <NewInjuryIllness
              incidentId={incidentId}
              companyId={companyId}
              divisionId={divisionId}
              jobsiteId={jobsiteId}
              closeModal={handleClose}
            />
          )}
          {showEditForm && (
            <EditInjuryIllness
              incidentId={incidentId}
              injuryIllnessID={selectedinIuriesId}
              companyId={companyId}
              divisionId={divisionId}
              jobsiteId={jobsiteId}
              closeModal={handleClose}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {/*  <Button variant="secondary" onClick={handleClose}> */}
          {/*    Close */}
          {/*  </Button> */}
          {/*  <Button variant="primary" onClick={handleClose}> */}
          {/*    Save Changes */}
          {/*  </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
