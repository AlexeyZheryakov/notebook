import type OpenAI from "openai"

export function mapDeepSeekResponseToResult(
  response: OpenAI.Chat.Completions.ChatCompletion,
): string | null {
  const choices = response.choices
    .map(shoice => shoice.message.content)
    .filter(Boolean)
  const [firstChoice] = choices

  return firstChoice
}
