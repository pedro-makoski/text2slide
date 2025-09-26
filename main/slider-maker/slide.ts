import { SlideStruct } from "./slide-struct";
import PptxGenJS from "pptxgenjs";

const SLIDE_WIDTH_INCHES = 10;
const SLIDE_HEIGHT_INCHES = 5.625;
const SLIDE_WIDTH_PIXELS = 1280;
const SLIDE_HEIGHT_PIXELS = 720;

const PPI_X = SLIDE_WIDTH_PIXELS / SLIDE_WIDTH_INCHES;
const PPI_Y = SLIDE_HEIGHT_PIXELS / SLIDE_HEIGHT_INCHES;

export function pxToInches(value: number, dimension: 'x' | 'y'): number {
    return dimension === 'x' ? value / PPI_X : value / PPI_Y;
}

export class Slide {
    private slideStruct: SlideStruct;

    constructor(slideStruct: SlideStruct) {
        this.slideStruct = slideStruct;
    }

    addSlideIn(powerPoint: PptxGenJS) {
        const slideContext = powerPoint.addSlide();
        this.montarSlideOnSlideContext(slideContext);
    }

    montarSlideOnSlideContext(slideContext: PptxGenJS.Slide) {
        this.defineBackgroundInContext(slideContext);
        this.addContents(slideContext);
    }

    private addContents(slideContext: PptxGenJS.Slide) {
        const payload = this.slideStruct.Payload;
        const pos = payload.textBoxPosition;

        slideContext.addText(payload.textObjects, {
            x: pos.x,
            y: pos.y,
            w: pos.w,
            h: pos.h,
            valign: pos.valign
        });
    }
 
    private defineBackgroundInContext(slideContext: PptxGenJS.Slide) {
        slideContext.background = {
            color: this.slideStruct.ConfigsMain.hexaFundoColor.replace("#", "")
        };
    }
}