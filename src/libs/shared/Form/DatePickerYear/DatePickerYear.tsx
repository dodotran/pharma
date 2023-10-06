import { base, red } from '@/libs/config/theme'
import { StackProps, SxProps } from '@mui/material'
import { DatePickerProps, DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { FieldError, FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { InputControl } from '../Input'

type AddControlProps = {
  helperText?: string
  label?: string
  fieldError?: FieldError | boolean
  required?: boolean
  inputContainerProps?: StackProps
  horizontal?: boolean
  errorText?: string
}

type ControlProps = AddControlProps & {
  fullWidth?: boolean
  inputSx?: SxProps
  required?: boolean
  horizontal?: boolean
}

type DatePickerType<T extends FieldValues> = UseControllerProps<T> &
  ControlProps &
  Omit<DatePickerProps<Date>, 'onChange' | 'value'> & {
    required?: boolean
  }

function DatePickerYear<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  helperText,
  fullWidth,
  required,
  inputSx,
  ...props
}: DatePickerType<T>) {
  const {
    field: { onChange, value, ref, ...inputProps },
    fieldState: { error: fieldError },
  } = useController({ name, control, defaultValue })

  const handleChange = (newValue: unknown) => {
    onChange(newValue)
  }
  return (
    <>
      <InputControl
        required={required}
        fieldError={fieldError}
        fullWidth={fullWidth as boolean}
        label={label}
        helperText={helperText}
        onKeyDown={(e) => {
          e.preventDefault()
        }}
        sx={{
          label: { fontWeight: 500, marginBottom: 0, fontSize: 12 },
        }}
      >
        <MuiDatePicker
          onOpen={() => {}}
          {...props}
          {...inputProps}
          value={value ? value : defaultValue}
          onChange={handleChange}
          inputRef={ref}
          slotProps={{
            textField: {
              variant: 'outlined',
              disabled: true,
            },
          }}
          format="dd/MM/yyyy"
          sx={{
            ...inputSx,
            width: 134,
            '&& .MuiInputBase-root': {
              paddingRight: '6px',
            },
            '&& .Mui-focused fieldset': {
              borderColor: base.black,
              borderWidth: 1,
            },
            '& .MuiOutlinedInput-input': {
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 'normal',
              paddingRight: 8,
              padding: '6px 0 6px 10px',
            },
            '&& .MuiOutlinedInput-notchedOutline': {
              borderColor: fieldError ? red[100] : base.black,
              '&:hover': {
                borderColor: base.black,
              },
              '&:focus': {
                borderColor: 'transparent !important',
              },
            },
            '&& .MuiButtonBase-root': {
              padding: 0,
              marginRight: 0,
            },
            '&.Mui-error': {
              border: `1px solid ${red[100]}`,
              '&.Mui-focused fieldset': {
                border: `1px solid ${red[100]}`,
              },
              '&:hover fieldset': {
                border: `1px solid ${red[100]}`,
              },
            },
          }}
        />
      </InputControl>
    </>
  )
}

export { DatePickerYear }
