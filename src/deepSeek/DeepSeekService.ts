import type OpenAI from "openai"

import { ensureDeepSeek } from "./ensureDeepSeek"
import { mapDeepSeekResponseToResult } from "./mappers/mapDeepSeekResponseToResult"
import type { GPTService } from "./types"

const DEEPSEEK_API_MODEL = import.meta.env.VITE_DEEPSEEK_API_MODEL

export const DEEPSEEK_NAME = "DeepSeek"

let instance: DeepSeekService | null = null

export class DeepSeekService implements GPTService {
  private openai: OpenAI
  public name: string = DEEPSEEK_NAME

  private constructor() {
    this.openai = ensureDeepSeek()
  }

  public static ensure() {
    if (instance) {
      return instance
    }

    return new DeepSeekService()
  }

  // public async translate(text: string, targetLang?: string): Promise<string> {
  //   try {
  //     const chatCompletion = await this.openai.chat.completions.create({
  //       messages: [
  //         {
  //           role: "system",
  //           content: `translate to ${targetLang || config.NATIVE_LANGUAGE}`,
  //         },
  //         { role: "user", content: text },
  //       ],
  //       model: DEEPSEEK_API_MODEL,
  //     })

  //     return mapDeepSeekResponseToResult(chatCompletion) || ""
  //   } catch (error) {
  //     throw new Error(`[${this.name}:translate] error - ${error}`)
  //   }
  // }

  public async ask(question: string): Promise<string> {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant",
          },
          { role: "user", content: `${question}` },
        ],
        model: DEEPSEEK_API_MODEL,
      })

      return mapDeepSeekResponseToResult(chatCompletion) || ""
    } catch (error) {
      throw new Error(`[${this.name}:ask] error - ${error}`)
    }
  }

  // public async makeArrayFromFunction<T extends string | object = string>(
  //   targetEntity: string,
  // ): Promise<T[]> {
  //   const promt = `come up json array of strings ${targetEntity}`
  //   try {
  //     const chatCompletion = await this.openai.chat.completions.create({
  //       temperature: 1.5,
  //       messages: [
  //         {
  //           role: "function",
  //           name: "getArray",
  //           content: `You are function, and have to return array`,
  //         },
  //         { role: "user", content: `${promt}` },
  //       ],
  //       model: DEEPSEEK_API_MODEL,
  //     })
  //     const stringResult = mapDeepSeekResponseToResult(chatCompletion) || ""
  //     console.log("[makeArrayFromFunction:stringResult] ", stringResult)

  //     return parseArrayFromString<T>(stringResult) || []
  //   } catch (error) {
  //     throw new Error(`[${this.name}:ask] error - ${error}`)
  //   }
  // }
}

export const deepSeekService = DeepSeekService.ensure()
