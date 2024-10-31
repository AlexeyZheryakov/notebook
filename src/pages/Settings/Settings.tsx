import { Container } from "@mui/material"
import s from "./styles.module.scss"

export const TEST_ID = "Settings"

const Settings = () => (
  <Container
    disableGutters
    maxWidth="xs"
    className={s.settings}
    data-testid={TEST_ID}
  >
    <div className={s.settingsContent}>Page Settings</div>
  </Container>
)

export default Settings
