import { Constants } from "./constants";
import { generateSlidesFromSectionString } from "./generate-slides-from-section";
import { SlideStruct } from "./slide-struct";
import { Configs } from "./types";

export function GenSlidesStructOnText(text: string, configs: Configs): SlideStruct[] {
    const res: SlideStruct[] = []
    const sections = text.split(Constants.SEPARATOR_SECTION)
    res.push(...GenSlidesStructOnSections(sections, configs))

    return res 
}

function GenSlidesStructOnSections(sections: string[], configs: Configs): SlideStruct[] {
    const slides: SlideStruct[] = []

    for(let section of sections) {
        slides.push(...GenSlidesOnSection(section, configs))
    }

    return slides
}

function GenSlidesOnSection(section: string, configs: Configs): SlideStruct[] {
    const res: SlideStruct[] = generateSlidesFromSectionString(section, configs)

    return res 
}