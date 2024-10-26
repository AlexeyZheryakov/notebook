import { Container, Stack } from "@mui/material"

import s from "./styles.module.scss"

export const TEST_ID = "Expenses"

const expenses = [
  {
    id: 1,
    type: "продукты",
    description: "купил продукты на дачу",
    cost: 1000,
    date: "26.10.2024",
  },
  {
    id: 2,
    type: "машина",
    description: "купил летнюю резину",
    cost: 1000,
    date: "26.10.2024",
  },
  {
    id: 3,
    type: "ребенок",
    description: "купил рюкзак",
    cost: 1000,
    date: "26.10.2024",
  },
]

const Expenses = () => {
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
