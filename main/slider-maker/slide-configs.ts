import { Constants } from "./constants";
import { createCreatorOfParagrafos, Paragrafo } from "./paragrafo";
import { pixelsParaPolegadas } from "./pixels-to-cm";
import { Configs } from "./types";

export class SlideConfigs {
    configs: Configs
    paragrafoMaker!: (content: string) => Paragrafo

    constructor(configs: Configs) {
        this.configs = configs
        this.initializeParagrafoMaker()
    }

    private initializeParagrafoMaker() {
        this.paragrafoMaker = createCreatorOfParagrafos(this.configs, {
            width: this.getPaintFullWidth(),
            height: this.getPaintFullHeight()
        })
    }

    getPaintFullWidth() {
        const newWidth =  Constants.WIDTH_POWERPOINT - pixelsParaPolegadas(this.configs.marginX * 2);
        if(newWidth < 0) {
            throw new Error("Margin muito grande")
        }

        return newWidth
    }

    getPaintFullHeight(): number {
        const newHeight =  Constants.HEIGHT_POWERPOINT - pixelsParaPolegadas(this.configs.marginY * 2);
        if(newHeight < 0) {
            throw new Error("Margin muito grande")
        }

        return newHeight
    }
    
    getMarginTopAndLeft(): [number, number] {
        return [pixelsParaPolegadas(this.configs.marginX), pixelsParaPolegadas(this.configs.marginY)]
    }

    getStartHeightDefault(): number {
        return pixelsParaPolegadas(this.configs.marginY * 2)
    }

    fitsThisContentInOtherSlide(text: string) {
        const paragrafo = this.paragrafoMaker(text)
        return paragrafo.isPossibleAddThisParagrafo(this.getStartHeightDefault())
    } 

    getAvailableHeight(filledHeight: number): number {
        return Constants.HEIGHT_POWERPOINT - filledHeight
    }
}