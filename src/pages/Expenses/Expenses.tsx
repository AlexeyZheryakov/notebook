import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import s from "./styles.module.scss"

export const TEST_ID = "Expenses"

const expenses = [
  {
    id: 1,
    type: "продукты",
    description: "купил продукты на дачу",
    cost: 1000,
    date: "26.10.2024",
  },
  {
    id: 2,
    type: "машина",
    description: "купил летнюю резину",
    cost: 1000,
    date: "26.10.2024",
  },
  {
    id: 3,
    type: "ребенок",
    description: "купил рюкзак",
    cost: 1000,
    date: "26.10.2024",
  },
]

const Expenses = () => {
  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.expenses}
      data-testid={TEST_ID}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <div className={s.expensesContent}>
          {expenses.map(({ id, type }) => (
            <Stack key={id}>{type}</Stack>
          ))}
        </div>
      </Box>
    </Container>
  )
}

export default Expenses
