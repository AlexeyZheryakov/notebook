import { Container } from "@mui/material"
import s from "./styles.module.scss"

export const TEST_ID = "ExpensesEdit"

const ExpensesEdit = () => (
  <Container
    disableGutters
    maxWidth="xs"
    className={s.expensesEdit}
    data-testid={TEST_ID}
  >
    <div className={s.expensesEditContent}>Page ExpensesEdit</div>
  </Container>
)

export default ExpensesEdit
