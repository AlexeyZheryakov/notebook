import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./app/App"
// import { store } from "./app/store"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { store } from "./redux/store"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Контейнер root не найден. НЕ удалось вмонтировать реакт приложение",
  )
}
