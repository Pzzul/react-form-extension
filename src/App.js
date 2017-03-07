/**
 * Created by shaochenlu on 3/6/17.
 */

import React from 'react';
import RegInput from './RegInput';
import RichForm from './RichForm.react';
import wrapInput from './FormWrapper';

const App = () => {
  let EmailInput = wrapInput(RegInput);
  return (
    <RichForm onValid={() => console.log('valid')} onInvalid={() => console.log('invalid')} onChange={(data) => console.log('data changed')}>
      <EmailInput name="email" format="" required errMsg="abc" showErrPhase="touched"/>
    </RichForm>
  );
};

export default App;