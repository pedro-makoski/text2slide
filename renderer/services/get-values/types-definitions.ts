import { PossiveisAlinhamentos } from "../../components/editor/alinhamento";

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
    AlignItems: string
}