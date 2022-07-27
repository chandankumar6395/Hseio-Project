// import { Col, Form, Row } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
// import { Button, CardContent, Grid, Typography } from '@mui/material';
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Grid,
  TextField as MuiTextField,
  Typography,
  Paper as MuiPaper,
  Box,
  CircularProgress,
} from '@mui/material';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { Formik } from 'formik';
import URLConstants from '../../constants/URLConstants';
import { fetchPOST } from '../../utils/NetworkUtils';
import { CustomBreadcrumbs, CustomDivider } from '../../utils/MUIStyle';

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const Paper = styled(MuiPaper)(spacing);

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    // .max(50, 'Too Long!')
    .required('Required'),
  // short_desc: Yup.string()
  //   // .min(2, 'Too Short!')
  //   // .max(50, 'Too Long!')
  //   .required('Required'),
  // long_desc: Yup.string()
  //   // .min(2, 'Too Short!')
  //   // .max(50, 'Too Long!')
  //   .required('Required'),
});

const NewAuditTypeMUI = () => {
  // const [validated, setValidated] = useState(false);

  const history = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      const postData = {
        name: values.name,
        short_desc: values.short_desc,
        long_desc: values.long_desc,
      };
      await postAuditType(postData);
      resetForm();
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      await setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  const postAuditType = async (data) => {
    try {
      const url = URLConstants.AUDIT_TYPES_URL;
      await fetchPOST(url, data);
      history('../../private/audit-types');
    } catch (error) {
      toast(error.message || 'Failed');
    }
  };

  return (
    <>
      <Helmet title="Add Audit Type" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Audit Types
          </Typography>

          <CustomBreadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to="/">
              Dashboard
            </Link>
            <Link component={NavLink} to="/private/audit-types">
              Audit Types
            </Link>
            <Typography>Add Audit Type</Typography>
          </CustomBreadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <NavLink to="/private/audit-types">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>

      <CustomDivider my={6} />

      <Formik
        initialValues={{
          name: '',
          short_desc: '',
          long_desc: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => (
          <Card mb={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic info
              </Typography>

              <Paper mt={3}>
                {isSubmitting ? (
                  <Box display="flex" justifyContent="center" my={6}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <form
                    noValidate
                    // validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Grid container spacing={6}>
                      <Grid item md={6}>
                        <TextField
                          required
                          id="name"
                          label="Name"
                          name="name"
                          value={values.name}
                          error={Boolean(touched.name && errors.name)}
                          variant="outlined"
                          size="small"
                          helperText={touched.name && errors.name}
                          // defaultValue="Lucy"
                          fullWidth
                          my={2}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          id="Short desc"
                          label="Short desc"
                          variant="outlined"
                          size="small"
                          name="short_desc"
                          value={values.short_desc}
                          // defaultValue="Lavender"
                          fullWidth
                          my={2}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item md={6}>
                        <TextField
                          id="Description"
                          label="Description"
                          multiline
                          rows={2}
                          variant="outlined"
                          size="small"
                          name="long_desc"
                          value={values.long_desc}
                          // defaultValue="Lavender"
                          fullWidth
                          my={2}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>

                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      mt={3}
                    >
                      Submit
                    </Button>
                  </form>
                )}
              </Paper>
            </CardContent>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default NewAuditTypeMUI;
