import React, { useContext, useState } from 'react';
import { Form, FormGroup, FormText, Label, Input, Button } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';
import { publicFetch } from '../utils/fetch';
import { Link, Redirect } from 'react-router-dom';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password min lenght is 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string().required('Confirm Password is required'),
});

const Signup = () => {
  const authContext = useContext(AuthContext);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  const submitCredentials = async (credentials, setErrors) => {
    try {
      const { email, password, confirmPassword } = credentials;

      if (password !== confirmPassword) {
        setErrors({ confirmPassword: 'Password do not match' });
        return;
      }

      const user = { email, password };

      const { data } = await publicFetch.post('/auth/signup', user);

      authContext.setAuthState(data);
      setRedirectOnLogin(true);
    } catch (err) {
      setErrors({ email: 'User already exist' });
    }
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/statistics" />}
      <div className="auth-wrapper">
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, { setErrors }) =>
            submitCredentials(values, setErrors)
          }
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
              <FormGroup row>
                <Label>Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Reenter password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <FormText color="danger">{errors.confirmPassword}</FormText>
                )}
              </FormGroup>

              <Button type="submit" color="primary" className="btn btn-block">
                Submit
              </Button>
              <p className="already-register text-right">
                Already registered <Link to="/login">Log in?</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Signup;
