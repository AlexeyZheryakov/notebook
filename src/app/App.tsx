import Router from "@/routes"
import "./index.scss"
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
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
  getRouteSettings,
} from "@/routes/router"

const App = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <Box maxWidth={"444px"} margin={"0 auto"} sx={{ flexGrow: 1 }}>
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
      </Box>

      <Router />
    </>
  )
}

export default App
