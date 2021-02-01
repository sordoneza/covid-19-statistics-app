import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Signup.css';

const Signup = () => {
  return (
    <>
      <div className="auth-wrapper">
        <Form>
          <h3>Sign Up</h3>
          <FormGroup row>
            <Label>Email address</Label>
            <Input type="email" className="form-control" placeholder="Enter email" />
          </FormGroup>
          <FormGroup row>
            <Label>Password</Label>
            <Input type="password" className="form-control" placeholder="Enter password" />
          </FormGroup>
          <Button type="submit" className="btn btn-primary btn-block">
            submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
