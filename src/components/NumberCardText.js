import React from 'react';
import numeral from 'numeral';
import { CardText } from 'reactstrap';
import clsx from 'clsx';

const NumberCardText = ({ label, value, variant }) => {
  if (!value) return <></>;
  return (
    <>
      <CardText
        className={clsx({
          [`text-${variant}`]: variant,
          'font-weight-bold': !variant,
        })}
      >
        {label}: {numeral(value).format(0.0)}
      </CardText>
    </>
  );
};

export default NumberCardText;
