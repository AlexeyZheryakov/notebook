import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"

import { SimpleDialog } from "@/components/SimpleDialog/SimpleDialog"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { clearExpense } from "@/redux/expenses/slice"
import { getRouteExpensesCreate, getRouteExpensesEdit } from "@/routes/router"
import AddIcon from "@mui/icons-material/Add"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import s from "./styles.module.scss"

export const TEST_ID = "Expenses"

const Expenses = () => {
  const [open, setOpen] = useState(false)

  const [id, setId] = useState<number | null>(null)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { expenses } = useAppSelector(state => state.expensesStore)

  const handleRemoveExpense = () => {
    if (!id) return

    dispatch(clearExpense(id))

    setOpen(false)

    setId(null)
  }

  const handleEditExpense = (id: number) => () => {
    navigate(getRouteExpensesEdit(id))
  }

  const handleOpenDialog = (id: number) => () => {
    setOpen(true)

    setId(id)
  }

  const handleCloseDialog = () => {
    setOpen(false)

    setId(null)
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
              <Button onClick={handleOpenDialog(id)} variant="contained">
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

      <SimpleDialog
        open={open}
        onClose={handleCloseDialog}
        title="Подтверждение"
        actions={
          <>
            <Button onClick={handleCloseDialog}>Отмена</Button>

            <Button onClick={handleRemoveExpense}>Удалить</Button>
          </>
        }
      >
        <Typography>Вы уверены, что хотите удалить запись?</Typography>
      </SimpleDialog>
    </Container>
  )
}

export default Expenses
