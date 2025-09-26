'use client'

import { IdNamesForm } from "../id-names/id-names";
import { ConfigsElements } from "./elements-definitions";
import { Configs } from "./types-definitions";
import { ValuesSetters } from "../id-names/values-setters";

function getElements(): ConfigsElements {
    const res: ConfigsElements = {
        marginX: document.getElementById(IdNamesForm.MarginX) as HTMLInputElement,
        marginY: document.getElementById(IdNamesForm.MarginY) as HTMLInputElement,
        textArea: document.getElementById(IdNamesForm.TextArea) as HTMLTextAreaElement,
    }

    return res 
}

export function getConfigs(): Configs {
    const els = getElements()
    const configs: Configs = {
        marginX: els.marginX.valueAsNumber,
        marginY: els.marginY.valueAsNumber,
        textArea: els.textArea.value,
        hexaFundoColor: ValuesSetters.ColorFundoHexa,
        AlignItems: ValuesSetters.PosicaoVertical,

        contentStyles: {
            alinhamento: ValuesSetters.contentConfigs.alinhamento,
            colorTextHexa: ValuesSetters.contentConfigs.colorHexa,
            fonte: ValuesSetters.contentConfigs.fontFamily,
            tamanho: ValuesSetters.contentConfigs.fontSize,
            isBold: ValuesSetters.contentConfigs.bold,
            isUnderline: ValuesSetters.contentConfigs.underline,
            isItalic: ValuesSetters.contentConfigs.italic
        },
        
        titleStyles: {
            alinhamento: ValuesSetters.titleConfigs.alinhamento,
            colorTextHexa: ValuesSetters.titleConfigs.colorHexa,
            fonte: ValuesSetters.titleConfigs.fontFamily,
            tamanho: ValuesSetters.titleConfigs.fontSize,
            isBold: ValuesSetters.titleConfigs.bold,
            isUnderline: ValuesSetters.titleConfigs.underline,
            isItalic: ValuesSetters.titleConfigs.italic
        }
    }

    return configs
}