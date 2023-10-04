import {
  FormControlProps,
  MenuItem,
  Select as RawSelect,
  SelectProps as RawSelectProps,
  SxProps,
} from '@mui/material'
import { FieldError, FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { InputControl, InputStyled } from '../Input'

type SelectOption = {
  label: string
  value: unknown
}

type AddControlProps = {
  helperText?: string
  label?: string
  fieldError?: FieldError | boolean
  required?: boolean
}

type SelectProps<T extends FieldValues> = UseControllerProps<T> &
  RawSelectProps &
  AddControlProps & {
    controlProps?: FormControlProps
    options?: SelectOption[]
    inputSx?: SxProps
    selectSx?: SxProps
    fullWidth?: boolean
  }

function Select<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  options = [],
  helperText,
  controlProps,
  required,
  inputSx,
  fullWidth,
  selectSx,
  ...props
}: SelectProps<T>) {
  const {
    field: { ref, value, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })
  return (
    <InputControl
      fieldError={error}
      label={label}
      helperText={helperText}
      required={required}
      fullWidth={fullWidth}
      {...controlProps}
    >
      <RawSelect
        value={value}
        ref={ref}
        sx={{ height: 35, borderRadius: 1, ...selectSx }}
        input={<InputStyled fullWidth inputProps={inputProps} sx={inputSx} />}
        {...inputProps}
        {...props}
      >
        {options.map((option: SelectOption) => (
          <MenuItem key={`${option.value}`} value={option.value as string}>
            {option.label}
          </MenuItem>
        ))}
      </RawSelect>
    </InputControl>
  )
}

export { Select }
