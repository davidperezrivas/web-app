import { Controller } from 'react-hook-form';
import { DropdownProps } from './interface';
import { Autocomplete, TextField } from '@mui/material';

const SelectAutoComplete = ({ control, fields, tittle, name, error, onChangeFunction }: DropdownProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Autocomplete
          disablePortal
          options={fields}
          getOptionLabel={(option) => option.label || ''} // Usa la clave 'label' para mostrar las opciones
          isOptionEqualToValue={(option, value) => option.value === value.value} // Compara por 'value'
          onChange={(_, data) => {
            field.onChange(data?.value || ''); // Envía solo el 'value' al formulario
            if (onChangeFunction) onChangeFunction(data); // Llama a la función personalizada si está definida
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={tittle} // Usa 'tittle' como etiqueta del campo
              error={!!error}
              helperText={error?.message} // Muestra el error si existe
              sx={{ mt: 2 }}
            />
          )}
        />
      )}
    />
  );
};

export default SelectAutoComplete;
