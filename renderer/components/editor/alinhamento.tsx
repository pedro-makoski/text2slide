import { Component } from "react";
import { Combobox } from "../ui/combo-box/combo-box";

interface ComponentProps {
  setAlinhamentoFunction: (newAlinhamento: string) => void 
  initialAlinhamento: PossiveisAlinhamentos
}

interface ComponentState {
}

export type PossiveisAlinhamentos = "centralizado" | "a-direita" | "a-esquerda" | "encaixado" 

type Alihamento = {
    label: string 
    value: PossiveisAlinhamentos 
}

const alinhamentos: Alihamento[] = [
    {
        label: "Centralizado",
        value: "centralizado"
    },
    {
        label: "A direita",
        value: "a-direita"
    },
    {
        label: "A esquerda",
        value: "a-esquerda"
    },
    {
        label: "Encaixado",
        value: "encaixado"
    },
]

export default class Alihamentos extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)
  }

  render() {
    return (
      <Combobox 
        inCaseNotFound="Não tem esse alinhamento"
        listaEls={alinhamentos}
        placeholder="Procure um alinhamento"
        onSetValue={this.props.setAlinhamentoFunction}
        initialValue={this.props.initialAlinhamento}
      />
    )
  }
} 