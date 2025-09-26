import { Chunks, ChunksMaker } from "./chunks-maker";
import { Paragrafo } from "./paragrafo";
import { SlideConfigs } from "./slide-configs";
import { SlideStruct } from "./slide-struct";
import { Configs } from "./types";
import PptxGenJS from "pptxgenjs";

export class SlideBuilder {
    actualSlide!: SlideStruct
    filledHeight: number = 0
    slides!: SlideStruct[]
    configs!: Configs
    slideConfigs!: SlideConfigs

    constructor(configs: Configs) {
        this.configs = configs
        this.slideConfigs = new SlideConfigs(this.configs)
        this.slides = []
        this.resetInitialSlide(this.slideConfigs.getMarginTopAndLeft())
    }

    getSlideInParagrafos(paragrafos: string[]): SlideStruct[] {
        for(const paragrafo of paragrafos) {
            this.addParagrafoOnString(paragrafo)
        }

        if (this.actualSlide.Payload.textObjects.length > 0) {
            this.slides.push(this.actualSlide)
        }
        
        return this.slides
    }

    resetInitialSlide(margin: [number, number]): void {
        this.actualSlide = {
            ConfigsMain: {
                ...this.configs
            },
            Payload: {
                textObjects: [],
                textBoxPosition: {
                    x: margin[0],
                    w: this.slideConfigs.getPaintFullWidth(),
                    y: margin[1],
                    h: this.slideConfigs.getPaintFullHeight(),
                    valign: this.configs.AlignItems as PptxGenJS.VAlign
                }
            }
        }
        
        this.filledHeight = this.slideConfigs.getStartHeightDefault()
    }

    initNewSlide(): void {
        if (this.actualSlide.Payload.textObjects.length > 0) {
            this.slides.push(this.actualSlide);
        }

        this.resetInitialSlide(this.slideConfigs.getMarginTopAndLeft());
    } 
    
    addParagrafoOnString(paragrafo: string) {
        const paragrafoObj = this.slideConfigs.paragrafoMaker(paragrafo)
        this.addParagrafoOnParagrafo(paragrafoObj)
    }


    addParagrafoOnParagrafo(paragrafo: Paragrafo) {
        const availableHeight = this.slideConfigs.getAvailableHeight(this.filledHeight);
        const heightParagrafo = paragrafo.getHeightOfParagrafo()

        if(paragrafo.isEmpty()) {
            return 
        }

        if (paragrafo.isPossibleAddThisParagrafo(availableHeight)) {
            this.appendParagrafoToCurrentSlide(paragrafo, heightParagrafo);
            return 
        } 

        this.splitAndDistributeParagrafo(paragrafo, availableHeight);
    }


    private appendParagrafoToCurrentSlide(paragrafo: Paragrafo, height: number) {
        this.actualSlide.Payload.textObjects.push({
            text: paragrafo.content,
            options: paragrafo.getOptionsOfParagrafo(this.configs)
        });

        this.fillHeight(height)
    }

    private fillHeight(quantNotRounded: number): void {
        this.filledHeight += Math.ceil(quantNotRounded)
    }

    private splitAndDistributeParagrafo(paragrafo: Paragrafo, availableHeight: number) {
        const chunks = new ChunksMaker(paragrafo, this.slideConfigs).getChunks(availableHeight)
        this.addChunksToEachSlide(chunks)
    }
    
    private addChunksToEachSlide(chunks: Chunks) {
        this.addParagrafoOnString(chunks[0])
        this.initNewSlide()
        this.addParagrafoOnString(chunks[1])
    }
}