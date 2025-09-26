import { JSX } from "react"
import { Combobox } from "../ui/combo-box/combo-box"

export interface Font {
    name: string,
}

interface labelValueStyle {
    label: string 
    value: string
}

interface PropsFonts {
    onSetFunction: (newFont: string) => void 
    fontFamily: string 
}

export class Fonts {
    static fontsList: Font[] = [
        {
            name: "Aptos Display (Títulos)",
        },
        {
            name: "AngsanaUPC",
        }
    ]

    private static formarLabelValue(): labelValueStyle[] {
        const res: labelValueStyle[] = []

        for(let font of Fonts.fontsList) {
            res.push({
                label: font.name,
                value: font.name,
            })
        }

        return res 
    }

    public static FontsEl({ onSetFunction, fontFamily }: PropsFonts): JSX.Element {
        return (
            <Combobox 
                inCaseNotFound="Não encotrado fontes"
                listaEls={Fonts.formarLabelValue()}
                placeholder="Procurar fonte"
                onSetValue={onSetFunction}
                initialValue={fontFamily}
            />
        )
    }
}