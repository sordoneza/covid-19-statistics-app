import React from 'react';
import Modal from 'styled-react-modal';
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import { Formik } from 'formik';

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const CasesStatus = ({ values, handleChange }) => {
  return (
    <Input
      id="status"
      name="status"
      type="select"
      values={values.status}
      onChange={handleChange}
    >
      <option value="new">New</option>
      <option value="active">Active</option>
      <option value="critical">Critical</option>
      <option value="recovered">Recovered</option>
    </Input>
  );
};
const StatisticDialog = ({ open, toggle, stat, updateOption }) => {
  const handleSubmit = () => {};

  return (
    <StyledModal isOpen={open} onBackgroundClick={toggle}>
      <Formik
        initialValues={{
          quantity: 0,
          status: '',
        }}
        onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <h4>Update {updateOption}</h4>
            <FormGroup row>
              <Label>Add</Label>
              <Input
                id="quantity"
                type="number"
                className="form-control"
                placeholder="Enter quantity"
                value={values.quantity}
                onChange={handleChange}
              />
              {errors.quantity && (
                <FormText color="danger">{errors.quantity}</FormText>
              )}
            </FormGroup>
            <Button type="submit" color="primary" className="btn mr-3">
              Submit
            </Button>
            <Button onClick={toggle}>Close</Button>
          </Form>
        )}
      </Formik>
    </StyledModal>
  );
};

export default StatisticDialog;
