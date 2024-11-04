import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"

import s from "./styles.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { clearExpense } from "@/redux/expenses/slice"
import { useNavigate } from "react-router-dom"
import { getRouteExpensesCreate, getRouteExpensesEdit } from "@/routes/router"
import AddIcon from "@mui/icons-material/Add"

export const TEST_ID = "Expenses"

const Expenses = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { expenses } = useAppSelector(state => state.expensesStore)

  const handleRemoveExpense = (id: number) => () => {
    dispatch(clearExpense(id))
  }

  const handleEditExpense = (id: number) => () => {
    navigate(getRouteExpensesEdit(id))
  }

  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.expenses}
      data-testid={TEST_ID}
    >
      <div className={s.expensesContent}>
        {expenses.map(({ id, category, cost, description, date }, i, arr) => (
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            key={id}
            sx={{
              borderBottom: i === arr.length - 1 ? "none" : "1px solid grey",
              padding: "10px 0",
            }}
          >
            <Box>
              <Typography>{category}</Typography>
              <Typography>{description}</Typography>
              <Button onClick={handleEditExpense(id)} variant="contained">
                редактировать
              </Button>
            </Box>
            <Box>
              <Typography>{cost} ₽</Typography>
              <Typography>{date}</Typography>
              <Button onClick={handleRemoveExpense(id)} variant="contained">
                удалить
              </Button>
            </Box>
          </Stack>
        ))}
      </div>

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "60px",
          height: "60px",
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "white",
          borderRadius: "50%",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <IconButton
          color="primary"
          aria-label="add expenses"
          onClick={() => {
            navigate(getRouteExpensesCreate())
          }}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Container>
  )
}

export default Expenses
