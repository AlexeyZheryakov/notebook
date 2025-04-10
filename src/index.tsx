import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./app/App"
// import { store } from "./app/store"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { START_COMAND } from "./pages/Main/Main"
import { startHandler } from "./pages/Settings/Settings"
import { store } from "./redux/store"
import { telegramService } from "./telegram/ensureTelegramBot"

const container = document.getElementById("root")

telegramService.command([START_COMAND], startHandler)

telegramService.start()

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
