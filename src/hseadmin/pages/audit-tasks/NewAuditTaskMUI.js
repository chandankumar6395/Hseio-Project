import { Col, Form, Row } from 'react-bootstrap';
import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Button, Grid, Typography } from '@mui/material';
import CompanySelect from '../../components/widgets/CompanySelect';
import DivisionSelect from '../../components/widgets/DivisionSelect';
import { KEY_COMPANY_ID } from '../../constants/Constants';
import URLConstants from '../../constants/URLConstants';
import { fetchPOST } from '../../utils/NetworkUtils';
import CustomSelect from '../../components/widgets/CustomSelect';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';
// import Select from "react-select";

const NewAuditTaskMUI = () => {
  const localCompanyId = localStorage.getItem(KEY_COMPANY_ID);
  const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const localJobSiteId = useSelector((state) => state.auth.selectedJobSite);

  console.log('NewEquipmentMUI localCompanyId', localCompanyId);
  console.log('NewEquipmentMUI localDivisionId', localDivisionId);
  console.log('NewEquipmentMUI localJobSiteId', localJobSiteId);

  // const localDivisionId = useSelector((state) => state.auth.selectedDivision);
  const [validated, setValidated] = useState(false);

  const history = useNavigate();

  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [companyId, setCompanyId] = useState(localCompanyId);
  const [divisionId, setDivisionId] = useState(localCompanyId);
  const [auditTypeId, setAuditTypeId] = useState('');

  const onAuditTaskSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();

    if (name === '') {
      toast('Please Enter audit Name');
    } else if (companyId === null) {
      toast('Please select Company');
    } else if (auditTypeId === '') {
      toast('Please Select Audit Type');
    } else {
      const postData = {
        name,
        short_desc: shortDesc,
        long_desc: longDesc,
        company_id: localCompanyId !== null ? localCompanyId : companyId,
        division_id: divisionId,
        // job_site_id: jobSiteId,
        audit_type_id: auditTypeId,
      };
      postAuditTask(postData);
    }
  };

  const postAuditTask = async (data) => {
    try {
      const url = URLConstants.AUDIT_TASKS_URL;
      const response = await fetchPOST(url, data);
      if (response.success === true) {
        history(`../../private/audit-tasks/edit/${response.data.id}`);
      } else {
        console.log('');
      }
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  const onShortDescChangeHandler = (event) => {
    console.log(event.target.value);
    setShortDesc(event.target.value);
  };

  const onLongDescChangeHandler = (event) => {
    console.log(event.target.value);
    setLongDesc(event.target.value);
  };

  const maxLongDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const maxShortDescCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <>
      <Helmet title="Add Audit Task" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Forms
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/audit-tasks">
              Audit Forms
            </Link>
            <Typography>Add Audit Form</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/audit-tasks">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Form noValidate validated={validated} onSubmit={onAuditTaskSubmit}>
            {/* Name Field */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name *"
                    onChange={onNameChangeHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Short Desc</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="255"
                    onInput={maxShortDescCheck}
                    placeholder="Short Desc"
                    onChange={onShortDescChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    maxLength="500"
                    onInput={maxLongDescCheck}
                    placeholder="Description"
                    onChange={onLongDescChangeHandler}
                  />
                </Form.Group>
              </Col>

              {/* Company id Field */}
              {localCompanyId === null && (
                <Col md={6}>
                  {/* Company id */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Name *</Form.Label>
                    <CompanySelect
                      onChange={(value) => {
                        setCompanyId(value);
                      }}
                    />
                  </Form.Group>
                </Col>
              )}

              {/* Division Field */}
              <Col md={6}>
                {/* Division id */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Division Name *</Form.Label>
                  <DivisionSelect
                    onChange={(value) => setDivisionId(value)}
                    companyId={
                      localCompanyId !== null ? localCompanyId : companyId
                    }
                  />
                </Form.Group>
              </Col>

              {/* <Col md={6}> */}
              {/*    /!* Job Site Id *!/ */}
              {/*    <Form.Group className="mb-3" controlId="formBasicEmail"> */}
              {/*        <Form.Label>Project *</Form.Label> */}
              {/*        <JobSiteSelect */}
              {/*            onChange={(value) => { */}
              {/*                setJobSiteId(value); */}
              {/*            }} */}
              {/*            companyId={companyId} */}
              {/*            divisionId={divisionId} */}
              {/*        /> */}
              {/*    </Form.Group> */}
              {/* </Col> */}

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Audit Type *</Form.Label>
                  <CustomSelect
                    params={{ url: URLConstants.AUDIT_TYPES_URL }}
                    onChange={(value) => {
                      setAuditTypeId(value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </Form>
        </Grid>
      </Grid>
    </>
  );
};

export default NewAuditTaskMUI;
