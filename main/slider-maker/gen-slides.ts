import { Slides } from "./slides";
import { Configs } from "./types";
import PptxGenJS from "pptxgenjs";

export function GenSlidesOnConfigs(configs: Configs): PptxGenJS {
    const powerPoint = new PptxGenJS()
    const slides = new Slides(powerPoint)
    
    slides.setConfigs(configs)
    slides.addSlidesOnText(configs.textArea)
    
    return slides.getPowerPoint()
}