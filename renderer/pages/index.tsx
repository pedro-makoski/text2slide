import Editor from "../components/editor/editor";
import Helper from "../components/helper/helper";
import React, { Component } from "react";

interface ComponentProps {

}

interface ComponentState {

}

export default class Index extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)
  }

  render() {
    return (
      <div className="p-4 w-full">
        <h1 className="text-4xl font-bold mb-4">Gere slides a partir de um texto</h1>
        <Editor/>
        <Helper />
      </div>
    )
  }
} 