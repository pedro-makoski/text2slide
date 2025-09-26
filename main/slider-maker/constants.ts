import { centimetroParaPolegadas } from "./pixels-to-cm"

export class Constants {
    static readonly SEPARATOR_LINE = "\n"
    static readonly PONTUATIONS = "?!."
    static readonly WIDTH_POWERPOINT = centimetroParaPolegadas(25.4)
    static readonly HEIGHT_POWERPOINT = centimetroParaPolegadas(14.29)
    static readonly TITLE_PREFIX = "# "
    static readonly SEPARATOR_SECTION = "\n---\n"
    static readonly SEPARATOR_WORD = " "
}