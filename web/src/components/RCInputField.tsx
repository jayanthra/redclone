import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type RCInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
}

export const RCInputField: React.FC<RCInputFieldProps> = ({label,size, ...props}) => {
  const [field, {error}] = useField(props);
    return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} placeholder={props.placeholder}/>
     { error ? <FormErrorMessage>{error}</FormErrorMessage> : null }

    </FormControl>
    );
}