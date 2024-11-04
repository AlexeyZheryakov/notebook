import { memo } from "react"
import type { FC } from "react"
import s from "./styles.module.scss"

export const TEST_ID = "TemplateName"

export interface TemplateNameProps {}

const TemplateName: FC<TemplateNameProps> = () => (
  <div className={s.templateName} data-testid={TEST_ID}>
    TemplateName
  </div>
)

export const TemplateNameMemo = memo(TemplateName)
