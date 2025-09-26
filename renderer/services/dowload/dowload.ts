'use client'

import { getConfigs } from "../get-values/get-values";
import { SavePowerPoint, choseNewFile } from "../save/savePowerPoint";

export async function dowload(): Promise<void> {
    const filePath = await choseNewFile()
    if (filePath) {
        const configs = getConfigs()
        await SavePowerPoint(configs, filePath)
    }
}