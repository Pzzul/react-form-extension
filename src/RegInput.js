/**
 * Created by shaochenlu on 3/6/17.
 */

import React from 'react';

let RegInput = ({onChange, value, showErr, errMsg, onBlur}) => {
  return (
    <div>
      <input onChange={(e) => onChange(e)} value={value} onBlur={e => onBlur(e)}/>
      {showErr && <div>{errMsg}</div>}
    </div>
  )
};

export default RegInput;