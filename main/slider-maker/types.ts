import PptxGenJS from "pptxgenjs";
export type PossiveisAlinhamentos = "centralizado" | "a-direita" | "a-esquerda" | "encaixado" 

export interface StyleDefinesEspecific {
    alinhamento: PossiveisAlinhamentos
    colorTextHexa: string
    fonte: string
    tamanho: number
    isBold: boolean
    isItalic: boolean
    isUnderline: boolean       
}

export interface Configs {
    hexaFundoColor: string 
    textArea: string 
    marginY: number 
    marginX: number 
    titleStyles: StyleDefinesEspecific
    contentStyles: StyleDefinesEspecific
    AlignItems: "top" | "bottom" | "center"
}

export function getCorrectAlign(align: PossiveisAlinhamentos): PptxGenJS.HAlign {
    if(align === "centralizado") {
        return "center"
    }

    if(align === "a-direita") {
        return "right"
    }

    if(align === "a-esquerda") {
        return "left"
    }

    return "justify"
}