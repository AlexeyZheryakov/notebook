import { Container } from "@mui/material"
import s from "./styles.module.scss"

export const TEST_ID = "TemplateName"

const TemplateName = () => {
  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.templateName}
      data-testid={TEST_ID}
    >
      <div className={s.templateNameContent}>Page TemplateName</div>
    </Container>
  )
}

export default TemplateName
