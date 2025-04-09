import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import type { ReactNode } from "react"

export interface SimpleDialogProps {
  open: boolean
  onClose: () => void
  title: string
  actions: ReactNode
  children: ReactNode
}

export const SimpleDialog = (props: SimpleDialogProps) => {
  const { open, onClose, title, actions, children } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>{children}</DialogContent>

      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}
