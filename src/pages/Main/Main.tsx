import { Container, Typography } from "@mui/material"
import { useAppSelector } from "@/hooks"
import s from "./styles.module.scss"

export const TEST_ID = "Main"

const Main = () => {
  const { expenses } = useAppSelector(state => state.expensesStore)

  const sumOfExpenses = expenses.reduce(
    (acc, { cost }) => acc + Number(cost),
    0,
  )

  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.main}
      data-testid={TEST_ID}
    >
      <div className={s.mainContent}>
        <Typography>Расходы {sumOfExpenses}₽</Typography>
      </div>
    </Container>
  )
}

export default Main
