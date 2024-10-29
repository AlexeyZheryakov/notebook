import { Container, Stack } from "@mui/material"

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
        {expenses.map(({ id, type }) => (
          <Stack key={id}>{type}</Stack>
        ))}
      </div>
    </Container>
  )
}

export default Expenses
