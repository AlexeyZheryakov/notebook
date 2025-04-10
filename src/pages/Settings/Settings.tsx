import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material"
import type { CommandContext, Context } from "grammy"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import s from "./styles.module.scss"

export const TEST_ID = "Settings"

const linkToken = uuidv4()

export const startHandler = async (ctx: CommandContext<Context>) => {
  const payload = ctx.match
  const id = ctx.from?.id || 0
  const chatId = ctx.chat.id || 0
  const username =
    ctx.from?.username ||
    ctx.from?.first_name ||
    ctx.from?.last_name ||
    "unknown"

  if (payload !== linkToken) return

  localStorage.setItem("chatId", chatId.toString())

  localStorage.setItem("userId", id.toString())

  await ctx.reply(`Пользователь ${username} успешно добавлен`)
}

const Settings = () => {
  const telegramBotLink = `https://t.me/AZH1773443_bot?start=${linkToken}`

  const userEmail = localStorage.getItem("userEmail")

  const [email, setEmail] = useState("")

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const setUserEmail = () => {
    localStorage.setItem("userEmail", email)

    handleClose()
  }

  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.settings}
      data-testid={TEST_ID}
    >
      <div className={s.settingsContent}>
        <Typography>Почта: {userEmail}</Typography>

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

          <Divider />

          <ListItem disablePadding>
            <ListItemButton onClick={handleClickOpen}>
              <ListItemText primary="Добавить почту" />
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem
            disablePadding
            component="a"
            href={telegramBotLink}
            target="blank"
          >
            <ListItemButton>
              <ListItemText primary=" Привязать Telegram" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить почту</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Почта"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChangeEmail}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Омена</Button>

          <Button onClick={setUserEmail}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Settings
