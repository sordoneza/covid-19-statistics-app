import React, { useContext } from 'react';
import Modal from 'styled-react-modal';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { Formik } from 'formik';
import { FetchContext } from '../context/FetchContext';

const StyledModal = Modal.styled`
  width: 30rem;
  height: 10rem;
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
      value={values.status}
      onChange={handleChange}
    >
      <option value="newCases">New</option>
      <option value="active">Active</option>
      <option value="critical">Critical</option>
      <option value="recovered">Recovered</option>
    </Input>
  );
};

const StatisticDialog = ({ open, toggle, stat, updateStat, updateOption }) => {
  const fetchContext = useContext(FetchContext);

  const handleSubmit = async values => {
    const { quantity, status } = values;

    let cases = { newCases: 0, critical: 0, active: 0, recovered: 0 };
    let deaths = { newDeaths: 0 };
    let tests = { newTests: 0 };

    if (updateCases) cases[status] = quantity;

    if (updateDeaths)
      deaths = Object.assign({}, deaths, { newDeaths: quantity });

    if (updateTests) tests = Object.assign({}, tests, { newTests: quantity });

    const updateStatistics = {
      statisticId: stat._id,
      cases,
      deaths,
      tests,
    };

    try {
      const { data } = await fetchContext.authAxios.put(
        '/statistics',
        updateStatistics,
      );

      console.log(data);

      updateStat(data);
      toggle();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCases = updateOption === 'Cases';
  const updateTests = updateOption === 'Tests';
  const updateDeaths = updateOption === 'Deaths';

  return (
    <StyledModal isOpen={open} onBackgroundClick={toggle}>
      <Formik
        initialValues={{
          quantity: 0,
          status: updateCases && 'newCases',
        }}
        onSubmit={values => handleSubmit(values)}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <Form className="container" onSubmit={handleSubmit}>
            <h4>Update {updateOption}</h4>
            <FormGroup row>
              <Label sm={2}>Add</Label>
              <Col sm={6}>
                <Input
                  id="quantity"
                  type="number"
                  className="form-control"
                  placeholder="Enter quantity"
                  value={values.quantity}
                  onChange={handleChange}
                />
              </Col>

              {updateCases && (
                <Col sm={4}>
                  <CasesStatus values={values} handleChange={handleChange} />
                </Col>
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
