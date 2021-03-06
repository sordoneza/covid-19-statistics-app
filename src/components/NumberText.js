import React from 'react';
import numeral from 'numeral';
import clsx from 'clsx';

const NumberText = ({ label, value, variant }) => {
  if (!value) return <></>;
  return (
    <>
      <span
        className={clsx({
          [`text-${variant}`]: variant,
        })}
      >
        {label}: {numeral(value).format(0.0)}
      </span>
    </>
  );
};

export default NumberText;
