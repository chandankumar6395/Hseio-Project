import React, { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';

import { toast } from 'react-toastify';

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
import { fetchDELETE, fetchGET, fetchPOST } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';

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

const PPEItemsTable = (props) => {
  const [equipmentId, setEquipmentId] = useState(-1);

  const { jobId } = props;

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchJobPpeEquipments();
  }, []);

  const deleteJobPpeEquipment = async (id) => {
    try {
      const url = `${URLConstants.GET_JOB_EQUIPMENT_URL}/${id}.json`;
      const response = await fetchDELETE(url);
      console.log(response.data);

      fetchJobPpeEquipments();
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };
  const fetchJobPpeEquipments = async () => {
    try {
      let url = `${URLConstants.JOB_EQUIPMENT_URL}?limit=100&page=1?job_id=${jobId}`;

      if (jobId !== null && jobId !== undefined) {
        url = `${url}&job_id=${jobId}`;
      }
      const response = await fetchGET(url);

      setItems(response.data);
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const addJobPpeEquipment = async () => {
    try {
      const url = URLConstants.JOB_EQUIPMENT_URL;
      const response = await fetchPOST(url, {
        job_id: jobId,
        equipment_id: equipmentId,
      });
      console.log(response.data);

      fetchJobPpeEquipments();
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
                  <th colSpan={4}>
                    <strong>
                      <u>PPE assessment (List all required PPE)</u>
                    </strong>{' '}
                  </th>

                  {/* <th style={{ textAlign: 'center' }}> */}
                  {/* */}
                  {/* </th> */}
                </tr>
                {items.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td colSpan={1}>{item.equipment.name}</td>
                      <td style={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            deleteJobPpeEquipment(item.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>
                    {' '}
                    <CustomSelect
                      params={{ url: URLConstants.EQUIPMENTS_URL }}
                      onChange={(value) => {
                        setEquipmentId(value);
                      }}
                    />
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        addJobPpeEquipment(jobId);
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default PPEItemsTable;
