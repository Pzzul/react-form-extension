/**
 * Created by shaochenlu on 3/6/17.
 */

import React from 'react';

let RegInput = ({onChange, value, hasErr, errMsg}) => {
  return (
    <div>
      <input onChange={(e) => onChange(e)} value={value}/>
      {hasErr && <div>{errMsg}</div>}
    </div>
  )
};

export default RegInput;