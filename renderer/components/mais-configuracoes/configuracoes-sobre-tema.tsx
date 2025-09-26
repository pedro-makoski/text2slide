import { Component } from "react";
import StyleDefines from "../editor/style-defines";
import { DefinitionsStylesEspecific } from "../../services/id-names/values-setters";

interface ComponentProps {
    label: string 

    configsStyles: DefinitionsStylesEspecific
}

interface ComponentState {

}

export default class ConfiguracoesSobreOTema extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3 className="text-xl font-bold">{this.props.label}</h3>
        <StyleDefines
          configs={this.props.configsStyles}
        />
      </div>
    )
  }
} 