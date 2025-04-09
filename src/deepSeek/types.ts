export interface GPTService {
  name: string
  ask: (text: string) => Promise<string>
  // translate: (text: string, targetLang?: string) => Promise<string>
  // /**
  //  * нейросеть может придумать коллекцию чего либо, например колекцию слов на определенную тему
  //  */
  // makeArrayFromFunction: <T extends string | object = string>(
  //   text: string,
  // ) => Promise<T[]>
}
