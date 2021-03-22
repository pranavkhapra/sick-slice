import React, { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValues(event) {
    // check if its a number and convert
    const { value } = event.target;
    if (event.target.value === 'number') {
      parseInt(value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      // that somebody change we want to change but we can't  make it static so we make it dynamic
      [event.target.name]: event.target.value,
    });
  }

  return { values, updateValues };
}
