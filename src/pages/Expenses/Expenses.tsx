import { Box, Container, Stack, Typography } from "@mui/material"

import s from "./styles.module.scss"
import { useAppSelector } from "@/hooks"

export const TEST_ID = "Expenses"

const Expenses = () => {
  const { expenses } = useAppSelector(state => state.expensesStore)

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
              <Typography> {category}</Typography>
              <Typography> {description}</Typography>
            </Box>
            <Box>
              <Typography> {cost}</Typography>
              <Typography> {date}</Typography>
            </Box>
          </Stack>
        ))}
      </div>
    </Container>
  )
}

export default Expenses
