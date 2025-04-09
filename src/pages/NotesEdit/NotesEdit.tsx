import { useAppDispatch, useAppSelector } from "@/hooks"
import { getNoteById } from "@/redux/notes/selectors"
import { addNote, changeNote } from "@/redux/notes/slice"
import { Box, Button, Container, TextField } from "@mui/material"
import { format } from "date-fns"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import s from "./styles.module.scss"

export const TEST_ID = "NotesEdit"

const NotesEdit = () => {
  const { id = "" } = useParams()

  const isEdit = !!id

  const note = useAppSelector(state => getNoteById(state, id))

  const navigate = useNavigate()

  const defaultValues = isEdit && note ? note.note : ""

  const [value, setValue] = useState(defaultValues)

  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isEdit) {
      dispatch(
        changeNote({
          note: value,
          id: note ? note.id : 0,
          date: note ? note.date : "",
        }),
      )
    } else {
      dispatch(
        addNote({
          note: value,
          id: Date.now(),
          date: format(new Date(), "dd.MM.yyyy"),
        }),
      )
    }

    setValue("")

    navigate(-1)
  }

  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.notesEdit}
      data-testid={TEST_ID}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <div className={s.notesEditContent}>
        <TextField
          id="outlined-multiline-flexible"
          label="Заметка"
          multiline
          maxRows={20}
          fullWidth
          onChange={e => setValue(e.target.value)}
          value={value}
        />

        <Box
          padding="20px"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Button fullWidth variant="contained" disabled={!value} type="submit">
            {isEdit ? "Сохранить" : "Добавить"}
          </Button>
        </Box>

        {/* <Stack
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
            aria-label="start listening"
            onClick={startListening}
            type="button"
          >
            {isOnVoice ? <KeyboardVoiceIcon /> : <MicNoneIcon />}
          </IconButton>
        </Stack> */}
      </div>
    </Container>
  )
}

export default NotesEdit
