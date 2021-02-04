import { Formik } from 'formik';
import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';

const Search = ({ getStatisticts }) => {
  const handleSearch = value => {
    getStatisticts(value);
  };

  return (
    <div className="search-navBar py-2 container align-items-md-center">
      <Formik
        initialValues={{
          countryId: '',
        }}
        onSubmit={values => handleSearch(values)}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Input
                id="countryId"
                type="text"
                className="form-control"
                placeholder="Search By Country (Write the name and hit enter)"
                value={values.countryId}
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Search;
