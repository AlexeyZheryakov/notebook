import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./app/App"
// import { store } from "./app/store"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { store } from "./redux/store"
import { telegramService } from "./telegram/ensureTelegramBot"
import { MENU_COMAND, START_COMAND } from "./pages/Main/Main"
import type { CommandContext, Context } from "grammy"

const container = document.getElementById("root")

// const startHandler = async (ctx: CommandContext<Context>) => {
//   const id = ctx.from?.id || 0
//   const chatId = ctx.chat.id || 0
//   const username =
//     ctx.from?.username ||
//     ctx.from?.first_name ||
//     ctx.from?.last_name ||
//     "unknown"

//   console.log(chatId)

//   await ctx.reply(`${chatId} ${id} ${username}`)
// }

// telegramService.command([START_COMAND, MENU_COMAND], startHandler)

// telegramService.start()

if (container) {
  const root = createRoot(container)

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  )
} else {
  throw new Error(
    "Контейнер root не найден. НЕ удалось вмонтировать реакт приложение",
  )
}
