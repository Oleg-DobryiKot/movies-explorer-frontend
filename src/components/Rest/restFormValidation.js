import { useCallback, useState } from 'react';

export function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const newValues = {...values, [name]: value};
    setValues(newValues);
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    setIsChanged(JSON.stringify(initialValues) !== JSON.stringify(newValues));
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsChanged(false);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, isChanged, resetForm };
}