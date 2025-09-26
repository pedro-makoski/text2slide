import { Configs } from "../get-values/types-definitions";

declare global {
  interface Window {
    pptxApi: {
        write: (dados: Configs, filePath: string) => Promise<void>
        choseNewFile: () => Promise<string | null>
    }
  }
}

export async function SavePowerPoint(configs: Configs, filePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        window.pptxApi.write(configs, filePath)
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}

export async function choseNewFile(): Promise<string | null> {
    return window.pptxApi.choseNewFile()
}