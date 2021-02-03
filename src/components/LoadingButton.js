import React from 'react';
import { Button, Spinner } from 'reactstrap';
import clsx from 'clsx';

const LoadingButton = ({ children, loading, ...rest }) => (
  <Button {...rest}>
    {loading && (
      <Spinner
        className={clsx({
          'position-relative': true,
          visible: loading,
          invisible: !loading,
        })}
        size="sm"
      />
    )}
    <span className="ml-3">{children}</span>
  </Button>
);

export default LoadingButton;
