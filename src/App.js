/**
 * Created by shaochenlu on 3/6/17.
 */

import React from 'react';
import RegInput from './RegInput';
import RichForm from './RichForm.react';
import wrapInput from './FormWrapper';

const App = () => {
  let EmailInput = wrapInput(RegInput);
  let handleChange = data => {
    console.log('change');
  };
  return (
    <RichForm onChange={data => handleChange(data)}>
      <EmailInput name="email" format="\d+" required requiredErrorMsg="abc" formatErrorMsg="bcd" defaultValue="ab"/>
    </RichForm>
  );
};

export default App;