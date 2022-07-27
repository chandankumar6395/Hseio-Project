import NumberFormat from 'react-number-format';
import React from 'react';

const CustomPhoneNumberView = ({ value }) => {
  return (
    <>
      <NumberFormat
        format="(###) ###-####"
        mask="_"
        displayType="text"
        value={value}
      />
    </>
  );
};

export default CustomPhoneNumberView;
