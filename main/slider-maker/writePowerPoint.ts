import { type Configs } from "./types";
import PptxGenJS from "pptxgenjs";
import { GenSlidesOnConfigs } from "./gen-slides";

export async function WritePowerPoint(context: any, configs: Configs, filePath: string): Promise<void> {
    try {
        const powerPoint: PptxGenJS = GenSlidesOnConfigs(configs)
        await powerPoint.writeFile({fileName: filePath})
    } catch (error) {
        console.error("Error writing PowerPoint file:", error)
    }
}