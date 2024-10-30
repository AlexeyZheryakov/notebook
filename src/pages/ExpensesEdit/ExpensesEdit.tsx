import { Button, Container, TextField } from "@mui/material"
import s from "./styles.module.scss"
import { forwardRef, useState } from "react"
import type { NumericFormatProps } from "react-number-format"
import { NumericFormat } from "react-number-format"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import dayjs from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useAppDispatch } from "@/hooks"
import { addExpense } from "@/redux/expenses/slice"
import { format } from "date-fns"

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
        prefix="₽ "
      />
    )
  },
)

const ExpensesEdit = () => {
  const dispatch = useAppDispatch()

  const [values, setValues] = useState({
    cost: "",
    category: "",
    description: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddExpense = () => {
    dispatch(
      addExpense({
        ...values,
        id: Date.now(),
        date: format(new Date(), "dd.MM.yyyy"),
      }),
    )
  }

  console.log(values)

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
          name="category"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Описание"
          variant="standard"
          name="description"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Сумма"
          value={values.cost}
          onChange={handleChange}
          name="cost"
          slotProps={{
            input: {
              inputComponent: NumericFormatCustom as any,
            },
          }}
          variant="standard"
          margin="normal"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            slots={{
              textField: props => (
                <TextField
                  {...props}
                  label="Дата"
                  variant="standard"
                  fullWidth
                  margin="normal"
                />
              ),
            }}
            format="DD.MM.YYYY"
            defaultValue={dayjs(new Date())}
          />
        </LocalizationProvider>
        <Button
          onClick={handleAddExpense}
          sx={{ marginTop: "100px" }}
          fullWidth
          variant="contained"
        >
          Добавить
        </Button>
      </div>
    </Container>
  )
}

export default ExpensesEdit
