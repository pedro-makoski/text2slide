import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { Configs } from './slider-maker/types'

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

const pptxMain = {
  write: (dados: Configs, filePath: string) => ipcRenderer.invoke("write-pptx", dados, filePath),
  choseNewFile: () => ipcRenderer.invoke("open-new-file")
}

contextBridge.exposeInMainWorld("pptxApi", pptxMain);

contextBridge.exposeInMainWorld('ipc', handler)

export type IpcHandler = typeof handler
export type PptxMain = typeof pptxMain