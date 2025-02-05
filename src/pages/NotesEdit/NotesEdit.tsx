import { useAppDispatch } from "@/hooks"
import { addNote } from "@/redux/notes/slice"
import { Box, Button, Container, TextField } from "@mui/material"
import { format } from "date-fns"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import s from "./styles.module.scss"

export const TEST_ID = "NotesEdit"

const NotesEdit = () => {
  const navigate = useNavigate()

  const [note, setNote] = useState("")

  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      addNote({
        note,
        id: Date.now(),
        date: format(new Date(), "dd.MM.yyyy"),
      }),
    )
    setNote("")
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
          label="Multiline"
          multiline
          maxRows={4}
          fullWidth
          onChange={e => setNote(e.target.value)}
          value={note}
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
          <Button fullWidth variant="contained" disabled={!note} type="submit">
            Добавить
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
