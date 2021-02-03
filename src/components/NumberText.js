import React from 'react';
const NumberText = ({ label, value, className }) => {
  if (!value) return <></>;
  return (
    <>
      <span className={className}>
        {label}: {value.toLocaleString()}
      </span>
    </>
  );
};

export default NumberText;
