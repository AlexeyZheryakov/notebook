import { Container } from "@mui/material"
import s from "./styles.module.scss"

export const TEST_ID = "Expenses"

const Expenses = () => (
  <Container
    disableGutters
    maxWidth="xs"
    className={s.expenses}
    data-testid={TEST_ID}
  >
    <div className={s.expensesContent}>Page Expenses</div>
  </Container>
)

export default Expenses
