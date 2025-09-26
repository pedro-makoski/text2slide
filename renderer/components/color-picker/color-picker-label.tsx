import { Component } from "react";
import ColorPicker from "./color-picker";

interface ComponentProps {
    label: string 
    defaultColor: string
    onSetColorHexFunction: (newColorHex: string) => void 
}

interface ComponentState {

}

export default class ColorPickerWithLabel extends Component<ComponentProps, ComponentState> {
    constructor(props: ComponentProps) {
        super(props)
    }

    render() {
        return (
            <>
                <div className="flex items-center gap-5">
                    <label>{this.props.label}</label>
                    <ColorPicker defaultColor={this.props.defaultColor} onSetHexFunction={this.props.onSetColorHexFunction}/>
                </div>
            </>
        )
    }
}