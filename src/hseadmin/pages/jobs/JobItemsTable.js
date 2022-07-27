import React, { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';

import { toast } from 'react-toastify';

import { Modal } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import URLConstants from '../../constants/URLConstants';
import { fetchDELETE, fetchGET } from '../../utils/NetworkUtils';
import EditJobItemForm from './EditJobItemForm';
import NewJobItemForm from './NewJobItemForm';

function SettingsPanel(props) {
  const { onApply, type, size, theme } = props;
  const [sizeState, setSize] = React.useState(size);
  const [typeState, setType] = React.useState(type);
  const [selectedPaginationValue, setSelectedPaginationValue] =
    React.useState(10);
  const [activeTheme, setActiveTheme] = React.useState(theme);

  const handleSizeChange = React.useCallback((event) => {
    setSize(Number(event.target.value));
  }, []);

  const handleDatasetChange = React.useCallback((event) => {
    setType(event.target.value);
  }, []);

  const handlePaginationChange = React.useCallback((event) => {
    setSelectedPaginationValue(event.target.value);
  }, []);

  const handleThemeChange = React.useCallback((event) => {
    setActiveTheme(event.target.value);
  }, []);

  const handleApplyChanges = React.useCallback(() => {
    onApply({
      size: sizeState,
      type: typeState,
      pagesize: selectedPaginationValue,
      theme: activeTheme,
    });
  }, [sizeState, typeState, selectedPaginationValue, activeTheme, onApply]);

  return (
    <FormGroup className="MuiFormGroup-options" row>
      <FormControl variant="standard">
        <InputLabel>Dataset</InputLabel>
        <Select value={typeState} onChange={handleDatasetChange}>
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Commodity">Commodity</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Rows</InputLabel>
        <Select value={sizeState} onChange={handleSizeChange}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>{Number(50).toLocaleString()}</MenuItem>
          <MenuItem value={100}>{Number(100).toLocaleString()}</MenuItem>
          <MenuItem value={1000}>{Number(1000).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Page Size</InputLabel>
        <Select
          value={selectedPaginationValue}
          onChange={handlePaginationChange}
        >
          <MenuItem value={-1}>off</MenuItem>
          <MenuItem value={0}>auto</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>{Number(25).toLocaleString()}</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel>Theme</InputLabel>
        <Select value={activeTheme} onChange={handleThemeChange}>
          <MenuItem value="default">Default Theme</MenuItem>
          <MenuItem value="ant">Ant Design</MenuItem>
        </Select>
      </FormControl>
      <Button
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleApplyChanges}
      >
        <KeyboardArrowRightIcon fontSize="small" /> Apply
      </Button>
    </FormGroup>
  );
}

SettingsPanel.propTypes = {
  onApply: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(['ant', 'default']).isRequired,
  type: PropTypes.oneOf(['Commodity', 'Employee']).isRequired,
};

const JobItemsTable = (props) => {
  const [selectedJobItemId, setSelectedJobItemId] = useState(-1);

  // useEffect(() => {
  //   if (selectedJobItemId !== -1) handleShow();
  // }, [selectedJobItemId]);

  const { jobId } = props;

  const [jobItems, setJobItems] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // console.log('==============Show model ID:', showModal);
  // console.log('==============Show Add form:', showAddForm);
  // console.log('==============Show Edit Form:', showEditForm);

  const handleClose = () => {
    setShowModal(false);
    setShowAddForm(false);
    setShowEditForm(false);
    fetchJobItems();
  };
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    fetchJobItems();
  }, []);

  const deleteJobItem = async (jobItemId) => {
    try {
      // console.log('JOBITEMID', jobItemId);
      // console.log('JOBID', jobId);
      const url = `${URLConstants.GET_JOB_ITEM_URL}/${jobItemId}.json`;
      const response = await fetchDELETE(url);
      console.log(response.data);

      fetchJobItems();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const fetchJobItems = async () => {
    try {
      let url = `${URLConstants.JOB_ITEMS_URL}?limit=100&page=1`;

      if (jobId !== null && jobId !== undefined) {
        url = `${url}&job_id=${jobId}`;
      }
      const response = await fetchGET(url);

      setJobItems(response.data);

      // props.resetReloadItems();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div>
            <table>
              <tbody>
                <tr style={{ textAlign: 'center' }}>
                  <th>
                    <strong>
                      <u>Job Stages</u>
                    </strong>{' '}
                    <br />
                    <span>
                      <i>Break job down into specific steps</i>
                    </span>
                  </th>
                  <th>
                    <strong>
                      <u>Hazard / Consequence</u>
                    </strong>{' '}
                    <br />
                    <span>
                      <i>
                        Use 7 <b>Hazard Sources</b> to identify hazards
                      </i>
                    </span>
                  </th>
                  <th>
                    <strong>
                      <u>Controls</u>
                    </strong>{' '}
                    <br />
                    <span>
                      <i>
                        Use <b>Hierarchy of Controls</b> to determine specific
                        controls to protect against the hazard
                      </i>
                    </span>
                  </th>
                  <th style={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleShow();
                        setShowAddForm(true);
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </th>
                </tr>
                {jobItems.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.job_stages}</td>
                      <td>{item.hazard_consequence}</td>
                      <td>{item.controls}</td>
                      <td style={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleShow();
                            setShowEditForm(true);
                            setSelectedJobItemId(item.id);
                          }}
                        >
                          <EditIcon />
                        </Button>{' '}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            deleteJobItem(item.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </Grid>
      </Grid>
      {/* <Modal */}
      {/*  style={{ zIndex: '1000000' }} */}
      {/*  show={showModal} */}
      {/*  onHide={handleClose} */}
      {/* > */}
      {/*  <Modal.Header closeButton> */}
      {/*    <Modal.Title>Add Item</Modal.Title> */}
      {/*  </Modal.Header> */}
      {/*  <Modal.Body> */}
      {/*    <EditJobItemForm */}
      {/*      close={handleClose} */}
      {/*      jobId={jobId} */}
      {/*      jobItemId={selectedJobItemId} */}
      {/*    /> */}
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
      <Modal
        style={{ zIndex: '1000000' }}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Item Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAddForm && <NewJobItemForm close={handleClose} jobId={jobId} />}
          {showEditForm && (
            <EditJobItemForm
              close={handleClose}
              jobId={jobId}
              jobItemId={selectedJobItemId}
            />
          )}
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
};

export default JobItemsTable;
