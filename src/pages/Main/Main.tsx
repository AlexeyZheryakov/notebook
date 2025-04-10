import { deepSeekService } from "@/deepSeek/DeepSeekService"
import { useAppSelector } from "@/hooks"
import type { IExpense } from "@/redux/expenses/slice"
import { telegramService } from "@/telegram/ensureTelegramBot"
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import s from "./styles.module.scss"

export const START_COMAND = "start"

export const TEST_ID = "Main"

const Main = () => {
  const userId = localStorage.getItem("userId")

  const [deepseekResponse, setDeepseekResponse] = useState("")

  const [month, setMonth] = useState("all")

  const { expenses } = useAppSelector(state => state.expensesStore)

  const expensesByMonth = expenses.reduce(
    (acc, exp) => {
      const [_, month, year] = exp.date.split(".")

      const key = `${month}.${year}`

      if (acc[key]) acc[key].push(exp)
      else acc[key] = [exp]

      return acc
    },
    {} as Record<string, IExpense[]>,
  )

  const sumOfExpenses = (
    month === "all" ? expenses : expensesByMonth[month]
  ).reduce((acc, { cost }) => acc + Number(cost), 0)

  const handlAskDeepSeek = async () => {
    const res = await deepSeekService.ask(
      `посчитай мои расходы за ${month} ${JSON.stringify(expenses)}`,
    )

    setDeepseekResponse(res)

    return res
  }

  useEffect(() => {
    // telegramService.on("message:text", ctx => {
    //   console.log(ctx.from?.id)
    //   ctx.reply("Echo: " + ctx.message.text)
    // })
    // Start the bot (using long polling)
  }, [])

  const handleClick = async () => {
    if (!userId) return

    telegramService.api.sendMessage(
      userId,
      `Расходы за ${month === "all" ? "все месяца" : month}: ${sumOfExpenses} ₽`,
    )
  }

  return (
    <Container
      disableGutters
      maxWidth="xs"
      className={s.main}
      data-testid={TEST_ID}
    >
      <div className={s.mainContent}>
        <FormControl variant="standard" fullWidth sx={{ mb: "10px" }}>
          <InputLabel id="demo-simple-select-standard-label">Период</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={month}
            onChange={e => setMonth(e.target.value)}
            label="Период"
          >
            <MenuItem value="all">Все</MenuItem>
            {Object.keys(expensesByMonth).map(month => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography>Расходы {sumOfExpenses.toLocaleString("ru")} ₽</Typography>

        <Button onClick={handleClick}>Отправить отчёт о расходах</Button>

        <ReactMarkdown>{deepseekResponse}</ReactMarkdown>
      </div>
    </Container>
  )
}

export default Main
