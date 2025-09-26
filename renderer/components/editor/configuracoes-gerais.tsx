import { Component, FormEvent, use, useState } from "react";
import { IdNamesForm } from "../../services/id-names/id-names";
import ColorPickerWithLabel from "../color-picker/color-picker-label";
import { Input } from "../ui/input";
import { ValuesSetters } from "../../services/id-names/values-setters";
import { Combobox } from "../ui/combo-box/combo-box";

interface ComponentProps {

}

interface ComponentState {
  marginX: number
  marginY: number 
}

type LabelValue = {
  label: string 
  value: string 
}

const valuesCentralizacaoVertical: LabelValue[] = [
  {
    label: "center",
    value: "center"
  },
  {
    label: "top",
    value: "top",
  },
  {
    label: "bottom",
    value: "bottom"
  }
]

export default class ConfiguracoesGerais extends Component<ComponentProps, ComponentState> {
  
  constructor(props: ComponentProps) {
    super(props)
    this.startMarginsDefault()
  }

  startMarginsDefault() {
    this.state = {
      marginX: 0,
      marginY: 0
    }
  }

  
  getOnEventValueAsNumber(e: FormEvent<HTMLInputElement>): number {
    return (e.target as HTMLInputElement).valueAsNumber
  }
  
  render() {
    return (
      <>
        <div className="my-5 flex items-center gap-5 justify-between">
          <div className="my-5 flex items-center gap-5">
            <ColorPickerWithLabel defaultColor={ValuesSetters.ColorFundoHexa} label="Cor de fundo" onSetColorHexFunction={ValuesSetters.OnSetColorFundoHexa}/>
            <div className="flex items-center gap-5">
              <label htmlFor={IdNamesForm.MarginX}>Margens Horizontais</label>
              <Input id={IdNamesForm.MarginX} type="number" value={this.state.marginX}
                 onInput={
                  (e) =>
                    this.setState(
                      {
                        marginX: this.getOnEventValueAsNumber(e)
                      }
                    )
                  }
              />
            </div>
            <div className="flex items-center gap-5">
              <label htmlFor={IdNamesForm.MarginY}>Margens Verticais</label>
              <Input id={IdNamesForm.MarginY} type="number" value={this.state.marginY}
              onInput={
                  (e) =>
                    this.setState(
                      {
                        marginY: this.getOnEventValueAsNumber(e)
                      }
                    )
                  }
              />
            </div>
          </div>
          <div>
            <Combobox 
              inCaseNotFound="Não foi enctrado nenhum alinhamento"
              initialValue={ValuesSetters.PosicaoVertical}
              listaEls={valuesCentralizacaoVertical}
              onSetValue={ValuesSetters.OnSetPosicaoVertical}
              placeholder="Centralização vertical"
            />
          </div>
        </div>
      </>
    )
  }
} 