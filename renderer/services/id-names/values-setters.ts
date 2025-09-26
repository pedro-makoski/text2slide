'use client'

import { PossiveisAlinhamentos } from "../../components/editor/alinhamento"
import { Fonts } from "../../components/font-selector/fonts"

export interface DefinitionsStylesEspecific {
    fontSize: number 
    onSetIncrementalFn: (newFontSize: number) => void 

    colorHexa: string 
    onSetColorPickerFn: (newColorText: string) => void 

    fontFamily: string 
    OnSetFontFamily: (newFontFamily: string) => void 

    alinhamento: PossiveisAlinhamentos 
    OnSetAlinhamento: (newAlinhamento: string) => void 

    bold: boolean
    onSetBold: (newBold: boolean) => void 
    
    italic: boolean
    onSetItalic: (newItalic: boolean) => void 

    underline: boolean
    onSetUnderline: (newUnderline: boolean) => void 
}

export class ValuesSetters {
    static ColorFundoHexa: string = "#ffffff"
    static PosicaoVertical: string = "center"

    static titleConfigs: DefinitionsStylesEspecific = {
        colorHexa: "#000000",
        fontFamily: Fonts.fontsList[0].name,
        fontSize: 16,
        alinhamento: "centralizado",
        bold: false,
        underline: false, 
        italic: false,
        
        onSetColorPickerFn(newColorText: string): void {
            ValuesSetters.titleConfigs.colorHexa = newColorText
        },

        OnSetFontFamily(newFontFamily: string): void {
            ValuesSetters.titleConfigs.fontFamily = newFontFamily
        },

        onSetIncrementalFn(newFontSize: number): void {
            ValuesSetters.titleConfigs.fontSize = newFontSize
        },

        OnSetAlinhamento(newAlinhamento: string): void {
            ValuesSetters.titleConfigs.alinhamento = newAlinhamento as PossiveisAlinhamentos
        },

        onSetBold(newBold): void {
            ValuesSetters.titleConfigs.bold = newBold
        },

        onSetItalic(italic): void {
            ValuesSetters.titleConfigs.italic = italic
        },

        onSetUnderline(underline): void {
            ValuesSetters.titleConfigs.underline = underline
        },
    }

    static contentConfigs: DefinitionsStylesEspecific = {
        colorHexa: "#000000",
        fontFamily: Fonts.fontsList[0].name,
        fontSize: 16,
        alinhamento: "centralizado",
        bold: false,
        underline: false, 
        italic: false,
        
        onSetColorPickerFn(newColorText: string): void {
            ValuesSetters.contentConfigs.colorHexa = newColorText
        },

        OnSetFontFamily(newFontFamily: string): void {
            ValuesSetters.contentConfigs.fontFamily = newFontFamily
        },

        onSetIncrementalFn(newFontSize: number): void {
            ValuesSetters.contentConfigs.fontSize = newFontSize
        },

        OnSetAlinhamento(newAlinhamento: string): void {
            ValuesSetters.contentConfigs.alinhamento = newAlinhamento as PossiveisAlinhamentos
        },

        onSetBold(newBold): void {
            ValuesSetters.contentConfigs.bold = newBold
        },

        onSetItalic(italic): void {
            ValuesSetters.contentConfigs.italic = italic
        },

        onSetUnderline(underline): void {
            ValuesSetters.contentConfigs.underline = underline
        },
    }


    static OnSetColorFundoHexa(newColorFundo: string): void {
        ValuesSetters.ColorFundoHexa = newColorFundo
    }

    static OnSetPosicaoVertical(newPosicaoVertical: string): void {
        ValuesSetters.PosicaoVertical = newPosicaoVertical
    }
}