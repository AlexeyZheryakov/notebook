import { useAppDispatch, useAppSelector } from "@/hooks"
import { clearNote } from "@/redux/notes/slice"
import { getRouteNotesCreate } from "@/routes/router"
import AddIcon from "@mui/icons-material/Add"
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import s from "./styles.module.scss"

export const TEST_ID = "Notes"

const Notes = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { notes } = useAppSelector(state => state.notesStore)

  const handleRemoveNote = (id: number) => () => {
    dispatch(clearNote(id))
  }

  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.notes}
      data-testid={TEST_ID}
    >
      <div className={s.notesContent}>
        {notes.map(({ id, note, date }, i, arr) => (
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            key={id}
            sx={{
              borderBottom: i === arr.length - 1 ? "none" : "1px solid grey",
              padding: "10px 0",
            }}
          >
            <Box>
              <Typography>{note}</Typography>
              <Button onClick={() => {}} variant="contained">
                редактировать
              </Button>
            </Box>
            <Box>
              <Typography>{date}</Typography>
              <Button onClick={handleRemoveNote(id)} variant="contained">
                удалить
              </Button>
            </Box>
          </Stack>
        ))}
      </div>

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "60px",
          height: "60px",
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "white",
          borderRadius: "50%",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <IconButton
          color="primary"
          aria-label="add expenses"
          onClick={() => {
            navigate(getRouteNotesCreate())
          }}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Container>
  )
}

export default Notes
