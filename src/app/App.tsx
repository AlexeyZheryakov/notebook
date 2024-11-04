import Router from "@/routes"
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
  getRouteExpensesCreate,
  getRouteMain,
  getRouteNotes,
  getRouteSettings,
} from "@/routes/router"
import HomeMaxIcon from "@mui/icons-material/HomeMax"
import NotesIcon from "@mui/icons-material/Notes"
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble"
import SettingsIcon from "@mui/icons-material/Settings"

const App = () => {
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
    setValue(newValue)
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
        <Router />
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
          />
          <BottomNavigationAction
            label="Заметки"
            value="notes"
            icon={<NotesIcon />}
            onClick={() => navigate(getRouteNotes())}
          />
          <BottomNavigationAction
            label="Расходы"
            value="expenses"
            icon={<CurrencyRubleIcon />}
            onClick={() => navigate(getRouteExpenses())}
          />
          <BottomNavigationAction
            label="Настройки"
            value="settings"
            icon={<SettingsIcon />}
            onClick={() => navigate(getRouteSettings())}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  )
}

export default App
