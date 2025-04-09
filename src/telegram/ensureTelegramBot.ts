import { Bot } from "grammy"

const TELEGRAM_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN

let telegramBot: Bot | null = null

export const ensureTelegramBot = () => {
  if (telegramBot) {
    return telegramBot
  }

  telegramBot = new Bot(TELEGRAM_TOKEN)

  return telegramBot
}

export const telegramService = ensureTelegramBot()
