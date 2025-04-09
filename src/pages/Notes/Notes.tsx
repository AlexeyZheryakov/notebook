import { SimpleDialog } from "@/components/SimpleDialog/SimpleDialog"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { clearNote } from "@/redux/notes/slice"
import { getRouteNotesCreate, getRouteNotesEdit } from "@/routes/router"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import s from "./styles.module.scss"

export const TEST_ID = "Notes"

const Notes = () => {
  const [open, setOpen] = useState(false)

  const [id, setId] = useState<number | null>(null)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { notes } = useAppSelector(state => state.notesStore)

  const handleRemoveNote = () => {
    if (!id) return

    dispatch(clearNote(id))

    setOpen(false)

    setId(null)
  }

  const handleEditNote = (id: number) => () => {
    navigate(getRouteNotesEdit(id))
  }

  const handleOpenDialog = (id: number) => () => {
    setOpen(true)

    setId(id)
  }

  const handleCloseDialog = () => {
    setOpen(false)

    setId(null)
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
            justifyContent="space-between"
            direction="row"
            columnGap="15px"
            key={id}
            sx={{
              borderBottom: i === arr.length - 1 ? "none" : "1px solid grey",
              padding: "10px 0",
            }}
          >
            <Box>
              <Typography>{note}</Typography>
            </Box>

            <Stack justifyContent="space-between">
              <Typography textAlign="end">{date}</Typography>

              <Stack direction="row">
                <Button onClick={handleEditNote(id)}>
                  <EditIcon sx={{ color: "#000" }} />
                </Button>

                <Button onClick={handleOpenDialog(id)}>
                  <DeleteIcon sx={{ color: "#000" }} />
                </Button>
              </Stack>
            </Stack>
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

      <SimpleDialog
        open={open}
        onClose={handleCloseDialog}
        title="Подтверждение"
        actions={
          <>
            <Button onClick={handleCloseDialog}>Отмена</Button>

            <Button onClick={handleRemoveNote}>Удалить</Button>
          </>
        }
      >
        <Typography>Вы уверены, что хотите удалить запись?</Typography>
      </SimpleDialog>
    </Container>
  )
}

export default Notes
