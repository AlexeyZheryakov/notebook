import { Container, TextField } from "@mui/material"
import s from "./styles.module.scss"
import { forwardRef, useState } from "react"
import type { NumericFormatProps } from "react-number-format"
import { NumericFormat } from "react-number-format"

export const TEST_ID = "ExpensesEdit"

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        thousandSeparator
        valueIsNumericString
        prefix="₽"
      />
    )
  },
)

const ExpensesEdit = () => {
  const [values, setValues] = useState({
    numberformat: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.expensesEdit}
      data-testid={TEST_ID}
    >
      <div className={s.expensesEditContent}>
        <TextField
          label="Категория"
          variant="standard"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Описание"
          variant="standard"
          fullWidth
          margin="normal"
        />
        <TextField
          fullWidth
          label="Сумма"
          value={values.numberformat}
          onChange={handleChange}
          name="numberformat"
          id="formatted-numberformat-input"
          slotProps={{
            input: {
              inputComponent: NumericFormatCustom as any,
            },
          }}
          variant="standard"
          margin="normal"
        />
      </div>
    </Container>
  )
}

export default ExpensesEdit
