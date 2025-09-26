import { getParagrafos } from "./paragrafo";
import { SlideBuilder } from "./slide-builder";
import { SlideStruct } from "./slide-struct";
import { Configs } from "./types";

export function generateSlidesFromSectionString(section: string, configs: Configs): SlideStruct[] {
    const paragrafos = getParagrafos(section)

    return new SlideBuilder(configs).getSlideInParagrafos(paragrafos)
}