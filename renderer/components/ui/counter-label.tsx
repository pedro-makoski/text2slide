import { Component } from "react";
import Incremental from "../ui/incremental";

interface ComponentProps {
    label: string 
    initValue: number 
    onSetFn: (newValue: number) => void 
}

interface ComponentState {

}


export default class CounterLabel extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)
  }

  render() {
    return (
        <div className="my-5 flex gap-5 items-center">
            <label>{this.props.label}</label>
            <Incremental initialValue={this.props.initValue} onSetIncrementalFn={this.props.onSetFn} />
        </div>
    )
  }
} 