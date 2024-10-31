import { Box, Button, Container, Stack, Typography } from "@mui/material"

import s from "./styles.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { clearExpense } from "@/redux/expenses/slice"

export const TEST_ID = "Expenses"

const Expenses = () => {
  const dispatch = useAppDispatch()

  const { expenses } = useAppSelector(state => state.expensesStore)

  const handleRemoveExpense = (id: number) => () => {
    dispatch(clearExpense(id))
  }

  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.expenses}
      data-testid={TEST_ID}
    >
      <div className={s.expensesContent}>
        {expenses.map(({ id, category, cost, description, date }) => (
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            key={id}
            sx={{ borderBottom: "1px solid grey", padding: "10px 0" }}
          >
            <Box>
              <Typography>{category}</Typography>
              <Typography>{description}</Typography>
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
    </Container>
  )
}

export default Expenses
