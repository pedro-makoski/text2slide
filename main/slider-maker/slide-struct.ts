import { Configs } from "./types"
import PptxGenJS from "pptxgenjs";

export type SlideRenderPayload = {
    textBoxPosition: { x: number; y: number; w: number; h: number, valign: PptxGenJS.VAlign };
    textObjects: PptxGenJS.TextProps[];
};

export type SlideStruct = {
    Payload: SlideRenderPayload;
    ConfigsMain: Configs;
};