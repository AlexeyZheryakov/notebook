import Router from "@/routes"
import MicNoneIcon from "@mui/icons-material/MicNone"
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice"
import "./index.scss"
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getRouteExpenses,
  getRouteMain,
  getRouteNotes,
  getRouteSettings,
} from "@/routes/router"
import HomeMaxIcon from "@mui/icons-material/HomeMax"
import NotesIcon from "@mui/icons-material/Notes"
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble"
import SettingsIcon from "@mui/icons-material/Settings"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider"
import { ru } from "date-fns/locale"
import { useAppDispatch } from "@/hooks"
import { addNote } from "@/redux/notes/slice"
import { format } from "date-fns"
import { addExpense } from "@/redux/expenses/slice"

enum VoiceCommands {
  add = "добавить",
}

enum VoiceEntities {
  note = "заметку",
  expense = "расходы",
}

const App = () => {
  const dispatch = useAppDispatch()
  const [isOnVoice, setIsOnVoice] = useState(false)

  const SpeechRecognition =
    // @ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  recognition.lang = "ru-RU" // Язык, используемый для распознавания речи
  recognition.interimResults = false // Завершенные результаты
  recognition.maxAlternatives = 1 // Максимум вариантов
  const startListening = () => {
    if (isOnVoice) return
    setIsOnVoice(true)
    recognition.start()
  }

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript
    // Сохранение заметки, например, вызовом функции добавления заметки
    setIsOnVoice(false)

    if (typeof transcript !== "string") return

    console.log(transcript)

    const [command, entity, ...other] = transcript.split(" ")

    if (command === VoiceCommands.add) {
      if (entity === VoiceEntities.note) {
        dispatch(
          addNote({
            note: other.join(" "),
            id: Date.now(),
            date: format(new Date(), "dd.MM.yyyy"),
          }),
        )
      }

      if (entity === VoiceEntities.expense) {
        const [_, category, __, ...otherText] = other

        const [description, cost] = otherText.join(" ").split("сумма")

        dispatch(
          addExpense({
            cost: cost.replace(/[^0-9]/g, ""),
            category,
            description,
            id: Date.now(),
            date: format(new Date(), "dd.MM.yyyy"),
          }),
        )
      }
    }
  }

  recognition.onerror = (event: any) => {
    console.error("Ошибка распознавания:", event.error)
  }

  recognition.onend = () => {
    setIsOnVoice(false)
  }

  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const [value, setValue] = useState("main")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== "voic") setValue(newValue)
  }

  return (
    <Container
      disableGutters
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* <Box margin={"0 auto"}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate(getRouteMain())
                  handleCloseMenu()
                }}
              >
                <Typography sx={{ textAlign: "center" }}>Главная</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(getRouteExpenses())
                  handleCloseMenu()
                }}
              >
                <Typography sx={{ textAlign: "center" }}>Расходы</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(getRouteExpensesCreate())
                  handleCloseMenu()
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  Расходы добавить
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(getRouteSettings())
                  handleCloseMenu()
                }}
              >
                <Typography sx={{ textAlign: "center" }}>Настройки</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box> */}

      <Box flexGrow={1} sx={{ overflow: "hidden" }}>
        <LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
          <Router />
        </LocalizationProvider>
      </Box>

      <Paper elevation={3}>
        <BottomNavigation
          sx={{ maxWidth: "444px", margin: "0 auto" }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Главная"
            value="main"
            icon={<HomeMaxIcon />}
            onClick={() => navigate(getRouteMain())}
            sx={{ minWidth: "unset", padding: 0 }}
          />
          <BottomNavigationAction
            label="Заметки"
            value="notes"
            icon={<NotesIcon />}
            onClick={() => navigate(getRouteNotes())}
            sx={{ minWidth: "unset", padding: 0 }}
          />
          <BottomNavigationAction
            icon={
              isOnVoice ? (
                <KeyboardVoiceIcon fontSize="large" />
              ) : (
                <MicNoneIcon fontSize="large" />
              )
            }
            value="voic"
            onClick={startListening}
            sx={{ minWidth: "unset", padding: 0 }}
          />
          <BottomNavigationAction
            label="Расходы"
            value="expenses"
            icon={<CurrencyRubleIcon />}
            onClick={() => navigate(getRouteExpenses())}
            sx={{ minWidth: "unset", padding: 0 }}
          />
          <BottomNavigationAction
            label="Настройки"
            value="settings"
            icon={<SettingsIcon />}
            onClick={() => navigate(getRouteSettings())}
            sx={{ minWidth: "unset", padding: 0 }}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  )
}

export default App
