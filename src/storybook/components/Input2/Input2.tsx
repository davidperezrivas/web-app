import { useMemo } from 'react';
import { InputProps } from './interface';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const Input2 = ({ tittle, name, errors, control, placeholder, type = 'text' }: InputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={tittle}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors[name]}
          helperText={errors[name] ?? placeholder}
        />
      )}
    />
  );
};

export default Input2;
