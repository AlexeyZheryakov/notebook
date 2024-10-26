import { Box, CircularProgress } from "@mui/material"

const Loading = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      background: "#ffffff",
      color: "#7fffd4",
    }}
  >
    <CircularProgress color="inherit" />
  </Box>
)

export default Loading
