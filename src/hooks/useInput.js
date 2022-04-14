import { useState } from 'react';

const useInput = (initial, required) => {
  const [val, setVal] = useState(initial);
  const [error, setError] = useState(null);
  return {
    val,
    error,
    onChange: (e) => setVal(e.target.value),
    onBlur: (e) => {
      !e.target.value && required ? setError('Required field') : setError(null);
    },
  };
};
export default useInput;
