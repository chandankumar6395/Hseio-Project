import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';
// import { darken } from 'polished';
// import { Search as SearchIcon } from 'react-feather';
// import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

import {
  Grid,
  // InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Menu as MenuIcon } from '@mui/icons-material';

// import Select from 'react-select';
// import NavbarNotificationsDropdown from './NavbarNotificationsDropdown';
// import NavbarMessagesDropdown from './NavbarMessagesDropdown';
// import NavbarLanguagesDropdown from './NavbarLanguagesDropdown';
import NavbarUserDropdown from './NavbarUserDropdown';

import {
  setSelectedDivision,
  setSelectedJobSite,
} from '../../hseadmin/store/actions/auth';

import {
  KEY_DIVISION_ID,
  KEY_DIVISIONS,
  KEY_JOB_SITES,
} from '../../hseadmin/constants/Constants';

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

// const Search = styled.div`
//   border-radius: 2px;
//   background-color: ${(props) => props.theme.header.background};
//   display: none;
//   position: relative;
//   width: 100%;
//
//   &:hover {
//     background-color: ${(props) => darken(0.05, props.theme.header.background)};
//   }
//
//   ${(props) => props.theme.breakpoints.up('md')} {
//     display: block;
//   }
// `;
//
// const SearchIconWrapper = styled.div`
//   width: 50px;
//   height: 100%;
//   position: absolute;
//   pointer-events: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//
//   svg {
//     width: 22px;
//     height: 22px;
//   }
// `;
//
// const Input = styled(InputBase)`
//   color: inherit;
//   width: 100%;
//
//   > input {
//     color: ${(props) => props.theme.header.search.color};
//     padding-top: ${(props) => props.theme.spacing(2.5)};
//     padding-right: ${(props) => props.theme.spacing(2.5)};
//     padding-bottom: ${(props) => props.theme.spacing(2.5)};
//     padding-left: ${(props) => props.theme.spacing(12)};
//     width: 160px;
//   }
// `;

const Navbar = ({ onDrawerToggle }) => {
  const dispatch = useDispatch();
  const selectedJobSite = useSelector((state) => state.auth.selectedJobSite);
  const selectedDivision = useSelector((state) => state.auth.selectedDivision);
  const [jobSites, setJobSites] = useState([]);
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    const value1 = localStorage.getItem(KEY_DIVISIONS);
    const value2 = localStorage.getItem(KEY_JOB_SITES);

    setDivisions(value1 ? JSON.parse(value1) : []);
    setJobSites(value2 ? JSON.parse(value2) : []);
  }, []);

  useEffect(() => {
    console.log(`Header useEffect selectedJobSite => ${selectedJobSite}`);
  }, [selectedJobSite]);

  useEffect(() => {
    console.log(`Header useEffect selectedDivision=> ${selectedDivision}`);
  }, [selectedDivision]);
  useEffect(() => {
    console.log('Job sites laoded');
    if (jobSites.length > 0) {
      const { id, primary_division_id: primaryDivisionId } = jobSites[0];
      dispatch(setSelectedDivision(primaryDivisionId));
      dispatch(setSelectedJobSite(id));
    }
  }, [jobSites]);

  useEffect(() => {
    console.log('Division --->');

    if (divisions.length > 0) {
      const { id } = divisions[0];
      dispatch(setSelectedDivision(id));
    }
  }, [divisions]);
  // const { t } = useTranslation();
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={onDrawerToggle}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            {/* <Search> */}
            {/*  <SearchIconWrapper> */}
            {/*    <SearchIcon /> */}
            {/*  </SearchIconWrapper> */}
            {/*  <Input placeholder={t('Search')} /> */}
            {/* </Search> */}
            {jobSites.length > 0 && (
              <>
                <span>Select Job Site</span>
                <Form.Select
                  onChange={(event) => {
                    dispatch(setSelectedJobSite(event.target.value));

                    console.log(`JobSite Selected${event.target.valueJobSite}`);
                    const jobsite = jobSites.find(
                      (x) => x.id === +event.target.value
                    );
                    console.log(
                      `Primary Division Id${jobsite.primary_division_id}`
                    );
                    dispatch(setSelectedDivision(jobsite.primary_division_id));
                    console.log('jobsite', jobsite);
                    localStorage.setItem(KEY_JOB_SITES, event.target.value);
                  }}
                >
                  {jobSites.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </>
            )}
            {divisions.length > 0 && (
              <>
                <span>Select Divisions</span>
                <Form.Select
                  onChange={(event) => {
                    // setDivisionOption(options);
                    dispatch(setSelectedDivision(event.target.value));
                    console.log(`Division Selected${event.target.value}`);
                    localStorage.setItem(KEY_DIVISION_ID, event.target.value);
                  }}
                >
                  {divisions.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </>
            )}
          </Grid>
          <Grid item xs />
          <Grid item>
            {/* <NavbarMessagesDropdown /> */}
            {/* <NavbarNotificationsDropdown /> */}
            {/* <NavbarLanguagesDropdown /> */}
            <NavbarUserDropdown />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withTheme(Navbar);
