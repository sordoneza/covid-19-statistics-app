import React, { useContext, useState } from 'react';
import { Form, FormGroup, FormText, Label, Input, Button } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';
import { publicFetch } from '../utils/fetch';
import { Redirect } from 'react-router-dom';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Signup = () => {
  const authContext = useContext(AuthContext);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  const submitCredentials = async credentials => {
    const { data } = await publicFetch.post('/auth/signup', credentials);

    authContext.setAuthState(data);

    setRedirectOnLogin(true);
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/statistics" />}
      <div className="auth-wrapper">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => submitCredentials(values)}
          validationSchema={SignUpSchema}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <h3>Sign Up</h3>
              <FormGroup row>
                <Label>Email address</Label>
                <Input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <FormText color="danger">{errors.email}</FormText>
                )}
              </FormGroup>
              <FormGroup row>
                <Label>Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <FormText color="danger">{errors.password}</FormText>
                )}
              </FormGroup>
              <Button type="submit" color="primary" className="btn btn-block">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Signup;
