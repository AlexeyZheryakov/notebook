import OpenAI from "openai"

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY

let openai: OpenAI | null = null

export const ensureDeepSeek = () => {
  if (openai) {
    return openai
  }

  openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: DEEPSEEK_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  return openai
}
