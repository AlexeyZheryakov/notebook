import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import s from "./styles.module.scss"

export const TEST_ID = "Settings"

const Settings = () => (
  <Container
    disableGutters
    maxWidth="xs"
    className={s.settings}
    data-testid={TEST_ID}
  >
    <div className={s.settingsContent}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Главная" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Заметки" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Расходы" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  </Container>
)

export default Settings
