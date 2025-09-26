import { Component } from "react";
import ColorPickerWithLabel from "../color-picker/color-picker-label";
import { Fonts } from "../font-selector/fonts";
import Alihamentos from "./alinhamento";
import CounterLabel from "../ui/counter-label";
import { DefinitionsStylesEspecific } from "../../services/id-names/values-setters";
import { Format } from "./format";
  
interface ComponentProps {
  configs: DefinitionsStylesEspecific
}

interface ComponentState {

}

export default class StyleDefines extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)
  }

  render() {
    return (
      <div className="flex justify-between full-width items-center">
        <div className="my-5 flex gap-5 items-center">
            <ColorPickerWithLabel label="Cor do do texto" defaultColor={this.props.configs.colorHexa} onSetColorHexFunction={this.props.configs.onSetColorPickerFn}/>
            <CounterLabel label="Tamanho do texto" onSetFn={this.props.configs.onSetIncrementalFn} initValue={this.props.configs.fontSize}/>
            <Format OnSetBold={this.props.configs.onSetBold} OnSetItalic={this.props.configs.onSetItalic} OnSetUnderline={this.props.configs.onSetUnderline}/>
        </div>
        <div className="my-5 flex gap-5 items-center">
          <Fonts.FontsEl onSetFunction={this.props.configs.OnSetFontFamily} fontFamily={this.props.configs.fontFamily}/>
          <Alihamentos setAlinhamentoFunction={this.props.configs.OnSetAlinhamento} initialAlinhamento={this.props.configs.alinhamento}/>
        </div>
      </div>
    )
  }
} 