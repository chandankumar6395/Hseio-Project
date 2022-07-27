/* eslint-disable no-unused-vars */
import * as React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import '../pages/companies/CompnayListNew.css';

import { Paper } from '@mui/material';
import { AntDesignStyledDataGridPro, StyledBox } from '../utils/MUIStyle';

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

export default function CustomDataTable(props) {
  const { columns, rows, loading } = props;
  const [isAntDesign, setIsAntDesign] = React.useState(false);
  const [type, setType] = React.useState('Commodity');
  const [size, setSize] = React.useState(10);

  const [pagination, setPagination] = React.useState({
    pagination: true,
    autoPageSize: true,
    pageSize: 10,
  });

  const getActiveTheme = () => {
    return isAntDesign ? 'ant' : 'default';
  };

  const handleApplyClick = (settings) => {
    if (size !== settings.size) {
      setSize(settings.size);
    }

    if (type !== settings.type) {
      setType(settings.type);
    }

    if (getActiveTheme() !== settings.theme) {
      setIsAntDesign(!isAntDesign);
    }

    // if (size !== settings.size || type !== settings.type) {
    //     setRowLength(settings.size);
    //     loadNewData();
    // }

    const newPaginationSettings = {
      pagination: settings.pagesize !== -1,
      autoPageSize: settings.pagesize === 0,
      pageSize: settings.pagesize > 0 ? settings.pagesize : undefined,
    };

    setPagination((currentPaginationSettings) => {
      if (
        currentPaginationSettings.pagination ===
          newPaginationSettings.pagination &&
        currentPaginationSettings.autoPageSize ===
          newPaginationSettings.autoPageSize &&
        currentPaginationSettings.pageSize === newPaginationSettings.pageSize
      ) {
        return currentPaginationSettings;
      }
      return newPaginationSettings;
    });
  };

  const DataGridComponent = isAntDesign
    ? AntDesignStyledDataGridPro
    : DataGridPro;

  return (
    <>
      <div>
        <Paper style={{ padding: '16px' }}>
          <StyledBox>
            {/* <SettingsPanel */}
            {/*  onApply={handleApplyClick} */}
            {/*  size={size} */}
            {/*  type={type} */}
            {/*  theme={getActiveTheme()} */}
            {/* /> */}
            <DataGridComponent
              componentsProps={{
                toolbar: { csvOptions: { allColumns: true } },
              }}
              {...{ columns, rows }}
              components={{
                Toolbar: GridToolbar,
              }}
              density="comfortable"
              loading={loading}
              // checkboxSelection
              disableSelectionOnClick
              rowThreshold={0}
              // initialState={{
              //     ...data.initialState,
              //     pinnedColumns: {left: ['__check__', 'desk']},
              // }}

              initialState={{
                pinnedColumns: { right: ['actions'] },
              }}
              {...pagination}
            />
          </StyledBox>
        </Paper>
      </div>
    </>
  );
}
