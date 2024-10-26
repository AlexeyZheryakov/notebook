import { Container } from "@mui/material"
import s from "./styles.module.scss"

export const TEST_ID = "Main"

const Main = () => (
  <Container
    disableGutters
    maxWidth="xs"
    className={s.main}
    data-testid={TEST_ID}
  >
    <div className={s.mainContent}>Page Main</div>
  </Container>
)

export default Main
