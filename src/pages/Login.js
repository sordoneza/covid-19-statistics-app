import React, { useContext } from 'react';
import { Form, FormGroup, FormText, Label, Input, Button } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const authContext = useContext(AuthContext);

  const submitCredentials = (credentials) => {
    console.log(credentials);
  };

  return (
    <>
      <div className="auth-wrapper">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => submitCredentials(values)}
          validationSchema={LoginSchema}
        >
          {({ values, handleChange, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <h3>Log In</h3>
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
                {errors.email && <FormText color="danger">{errors.email}</FormText>}
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
                {errors.password && <FormText color="danger">{errors.password}</FormText>}
              </FormGroup>
              <Button type="submit" className="btn primary btn-block">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
