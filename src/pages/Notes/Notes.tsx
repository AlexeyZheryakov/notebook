import { Container } from "@mui/material"
import s from "./styles.module.scss"

export const TEST_ID = "Notes"

const Notes = () => (
  <Container
    disableGutters
    maxWidth="xs"
    className={s.notes}
    data-testid={TEST_ID}
  >
    <div className={s.notesContent}>Page Notes</div>
  </Container>
)

export default Notes
