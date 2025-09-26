import PptxGenJS from "pptxgenjs";
import { Configs } from "./types";
import { Slide } from "./slide";
import { SlideStruct } from "./slide-struct";
import { GenSlidesStructOnText } from "./gen-slides-structs-on-text";

export class Slides {
    private slides!: PptxGenJS
    private configs!: Configs

    constructor(slides: PptxGenJS) {
        this.slides = slides
    }

    setConfigs(configs: Configs) {
        this.configs = configs
    }
    
    addSlidesOnText(text: string) {
        const slidesStruct = GenSlidesStructOnText(text, this.configs)
        this.addSlides(slidesStruct)
    }

    addSlides(slidesStruct: SlideStruct[]) {
        slidesStruct.forEach(slideStruct => this.addSlide(slideStruct));
    }

    private addSlide(slideStruct: SlideStruct) {
        const slide = new Slide(slideStruct)
        slide.addSlideIn(this.slides)
    }

    getPowerPoint(): PptxGenJS {
        return this.slides
    }
}