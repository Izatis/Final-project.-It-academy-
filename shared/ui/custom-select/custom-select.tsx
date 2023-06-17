import { FC, ChangeEvent, memo } from 'react';
import { TextField, BaseTextFieldProps } from '@mui/material'
import { useField, FieldHookConfig, useFormikContext } from 'formik'

interface Props extends BaseTextFieldProps {
    options: string[]
}

const CustomSelect: FC<Props & FieldHookConfig<string>> = memo(({
    name,
    options,
    ...props
}) => {

    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(name)

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target
        setFieldValue(name, value)
    }

    const configSelect = {
        ...props,
        ...field,
        variant: props.variant || 'outlined',
        select: true,
        SelectProps: { native: true },
        fullWidth: true,
        onChange: handleChange
    }

    if (meta && meta.touched && meta.error) {
        configSelect.error = true
        configSelect.helperText = meta.error
    }

    return (
        <TextField {...configSelect}>
            {options.map((item, idx) => {
                return (
                    <option 
                        key={idx} 
                        value={item}
                    >
                        {item}
                    </option>
                )
            })}
        </TextField>
    )
});

export default CustomSelect;