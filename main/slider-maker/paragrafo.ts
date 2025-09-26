import { Constants } from "./constants";
import { pixelsParaPolegadas, polegadasParaPixel } from "./pixels-to-cm"
import { Configs, getCorrectAlign } from "./types"
import PptxGenJS from "pptxgenjs";


export function createCreatorOfParagrafos(configs: Configs, configsParagrafo: ConfigsParagrafo): ((content: string) => Paragrafo) {
    return (content: string): Paragrafo => {
        return getParagrafoOnConfigs(content, configs, configsParagrafo)
    } 
}

export function getParagrafoOnConfigs(content: string, configs: Configs, configsParagrafo: ConfigsParagrafo): Paragrafo {
    const paragrafo = new Paragrafo(content)
    paragrafo.defineTamanho(configs.titleStyles.tamanho, configs.contentStyles.tamanho)
    paragrafo.defineConfigsParagrafo(configsParagrafo)

    return paragrafo
}

interface ConfigsParagrafo {
    width: number,
    height: number 
}

export class Paragrafo {
    private _content: string = ""
    private _tamanho: number = 0
    private configs: ConfigsParagrafo = {
        width: 0,
        height: 0
    }
    
    constructor(content: string) {
        this._content = content
    }

    get length(): number {
        return this.content.length
    }
    
    isEmpty() {
        return this.length === 0
    }

    defineConfigsParagrafo(configs: ConfigsParagrafo) {
        this.configs = configs
    }

    defineTamanho(ifTitulo: number, ifContent: number): void {
        if(isTitle(this._content)) {
            this._tamanho = ifTitulo
        }

        this._tamanho = ifContent
    }

    get content(): string {
        if(isTitle(this._content)) {
            return this._content.substring(Constants.TITLE_PREFIX.length)
        }

        return this._content
    }

    getHeightOfParagrafo(): number {
        const heightParagrafo = calcularAlturaParagrafo(this.content, this._tamanho, this.configs.width)
        return heightParagrafo
    }

    getQuantOfLinesOfParagrafo(): number {
        const heightParagrafo = this.getHeightOfParagrafo()
        return this.getQuantOfLinesOfSimulatedHeight(heightParagrafo)
    }

    getQuantOfLinesOfSimulatedHeight(simulatedHeight: number) {
        const lengthLines = getLinesFromHeight(simulatedHeight, this._tamanho)
        return lengthLines
    }

    getOptionsOfParagrafo(configs: Configs): PptxGenJS.TextPropsOptions {
        const doesItATitle = isTitle(this._content)
        const origin = doesItATitle ? configs.titleStyles : configs.contentStyles

        return {
            align: getCorrectAlign(origin.alinhamento),
            color: origin.colorTextHexa,
            fontFace: origin.fonte,
            fontSize: origin.tamanho,
            bold: origin.isBold,
            italic: origin.isItalic,
            underline: origin.isUnderline ? {
                color: origin.colorTextHexa,
                style: "heavy"
            } : undefined,
            h: this.configs.width,
            w: this.configs.height,
            breakLine: true
        }
    } 

    isPossibleAddThisParagrafo(availableHeight: number): boolean {
        const heightParagrafo = this.getHeightOfParagrafo()
        return Math.ceil(heightParagrafo) <= Math.ceil(availableHeight)       
    }

    getQuantCharsByLine(): number {
        const lines = this.getQuantOfLinesOfParagrafo()
        if(lines <= 0) {
            return 0
        }

        return this.content.length/lines;
    }
}

function isTitle(text: string): boolean {
    return text.startsWith(Constants.TITLE_PREFIX)
}

function calcularAlturaParagrafo(
  content: string,
  fontSizeInPixels: number,
  containerWidth: number,
): number {
    const fontSize = pixelsParaPolegadas(fontSizeInPixels)
    if (!fontSize || !containerWidth) {
        return 0;
    }

    const lineHeight = 2.1;
    const polegadaLineHeight = fontSize * lineHeight;
    if(content.trim().length === 0) {
        return polegadaLineHeight
    }
    
    const avgCharWidth = fontSize * 0.6;
    const charsPerLine = Math.floor(containerWidth / avgCharWidth);
    const totalLines = Math.ceil(content.length / charsPerLine);
    const paragraphHeight = totalLines * polegadaLineHeight;

    return paragraphHeight;
}

function getLinesFromHeight(
  paragraphHeightInches: number,
  fontSize: number
): number {
  if (paragraphHeightInches <= 0 || fontSize <= 0) {
    return 0;
  }

  const paragraphHeightInPixels = polegadasParaPixel(paragraphHeightInches);

  const numberOfLines = paragraphHeightInPixels / fontSize;

  return Math.round(numberOfLines);
}

export function getParagrafos(section: string): string[] {
    return section.split(Constants.SEPARATOR_LINE)
}