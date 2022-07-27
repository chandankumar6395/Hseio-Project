import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import * as Yup from 'yup';
import { Formik } from 'formik';

import {
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { spacing } from '@mui/system';

import useAuth from '../../hooks/useAuth';
import { LOGIN_TYPE_DATA } from '../../hseadmin/constants/Constants';

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  return (
    <Formik
      initialValues={{
        email: 'admin@test.com',
        password: 'admin@1234',
        type_id: 1,
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
        type_id: Yup.string(),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.email, values.password, values.type_id);

          navigate('/private');
        } catch (error) {
          const message = error.message || 'Something went wrong';
          console.log('I am here');
          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Alert mt={3} mb={3} severity="info">
            Use <strong>admin@test.com</strong> and <strong>admin@1234</strong>{' '}
            to sign in
          </Alert>
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />
          <FormControl my={2} fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Login Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="type_id"
              label="Select Login Type"
              value={values.type_id}
              onChange={handleChange}
            >
              {LOGIN_TYPE_DATA.map((type) => {
                return (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
          {/* <Button */}
          {/*  component={Link} */}
          {/*  to="/auth/reset-password" */}
          {/*  fullWidth */}
          {/*  color="primary" */}
          {/* > */}
          {/*  Forgot password */}
          {/* </Button> */}
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
