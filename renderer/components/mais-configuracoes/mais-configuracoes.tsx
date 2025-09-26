import { Component } from "react";
import ConfiguracoesSobreOTema from "./configuracoes-sobre-tema";
import { IdNamesForm } from "../../services/id-names/id-names";
import { ValuesSetters } from "../../services/id-names/values-setters";

interface ComponentProps {

}

interface ComponentState {

}

export default class MaisConfiguracoes extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)
  }

  render() {
    return (
      <div className="border-solid border-2 rounded-md my-5 p-5">
        <h2 className="text-[2em] font-bold">Configurações</h2>
        <ConfiguracoesSobreOTema 
          label="Título" 
          configsStyles={ValuesSetters.titleConfigs}
        />
        <ConfiguracoesSobreOTema 
          label="Conteúdo" 
          configsStyles={ValuesSetters.contentConfigs}
        />
      </div>
    )
  }
} 