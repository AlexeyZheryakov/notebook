import { useAppDispatch, useAppSelector } from "@/hooks"
import { addExpense, changeExpense } from "@/redux/expenses/slice"
import { Box, Button, Container, TextField } from "@mui/material"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { format } from "date-fns"
import { forwardRef, useState } from "react"
import type { NumericFormatProps } from "react-number-format"
import { NumericFormat } from "react-number-format"
import { useNavigate, useParams } from "react-router-dom"
import s from "./styles.module.scss"
import { getExpenseById } from "@/redux/expenses/selectors"
import { getDateFromString } from "@/utils/getDateFromString"

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
  const { id = "" } = useParams()

  const isEdit = !!id

  const expense = useAppSelector(state => getExpenseById(state, id))

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const defaultValues =
    isEdit && expense ? expense : { cost: "", category: "", description: "" }

  const [values, setValues] = useState(defaultValues)

  const [date, setDate] = useState<Date>(new Date())

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEdit) {
      dispatch(
        changeExpense({
          ...values,
          id: expense ? expense.id : 0,
          date: format(date, "dd.MM.yyyy"),
        }),
      )
    } else {
      dispatch(
        addExpense({
          ...values,
          id: Date.now(),
          date: format(date, "dd.MM.yyyy"),
        }),
      )
    }

    setValues({
      cost: "",
      category: "",
      description: "",
    })

    navigate(-1)
  }

  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.expensesEdit}
      data-testid={TEST_ID}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <div className={s.expensesEditContent}>
        <TextField
          label="Категория"
          variant="standard"
          name="category"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={values.category}
        />
        <TextField
          label="Описание"
          variant="standard"
          name="description"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={values.description}
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
          format="dd.MM.yyyy"
          defaultValue={
            isEdit && expense ? getDateFromString(expense.date) : new Date()
          }
          onChange={date => {
            if (date) setDate(date)
          }}
        />

        <Box
          padding="20px"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            disabled={!values.cost || !values.category || !values.description}
            type="submit"
          >
            {isEdit ? "Сохранить" : "Добавить"}
          </Button>
        </Box>
      </div>
    </Container>
  )
}

export default ExpensesEdit
