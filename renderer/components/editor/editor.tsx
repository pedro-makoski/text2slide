import { Component } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IdNamesForm } from "../../services/id-names/id-names";
import ColorPickerWithLabel from "../color-picker/color-picker-label";
import MaisConfiguracoes from "../mais-configuracoes/mais-configuracoes";
import ConfiguracoesGerais from "./configuracoes-gerais";
import { dowload } from "../../services/dowload/dowload";

interface ComponentProps {

}

interface ComponentState {

}

export default class Editor extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)
  }

  render() {
    return (
      <>
        <ConfiguracoesGerais />
        <div>
          <Textarea placeholder="Digite o texto" className="min-h-100" id={IdNamesForm.TextArea}></Textarea>
          <MaisConfiguracoes />
          <Button className="my-5 w-full" variant='secondary' id={IdNamesForm.ButtonSend} onClick={dowload}>Gerar slide</Button>
        </div>
      </>
    )
  }
} 