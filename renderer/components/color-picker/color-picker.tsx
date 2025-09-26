import React, { Component } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Slider } from "../../components/ui/slider";
import { hexToHsl, hslToHex } from './color-utils';

interface ColorPickerState {
  h: number;
  s: number;
  l: number;
  hex: string;
}

interface ColorPickerProps {
  defaultColor: string 
  onSetHexFunction: (newHex: string) => void  
}

class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
  constructor(props: ColorPickerProps) {
    super(props);
    this.initializeState()
  }

  newSetHex(newHex: string): void {
    this.setState({hex: newHex})
    this.props.onSetHexFunction(newHex)
  }

  private initializeState() {
    const initialHsl = hexToHsl(this.props.defaultColor);

    this.state = {
      h: initialHsl[0],
      s: initialHsl[1],
      l: initialHsl[2],
      hex: this.props.defaultColor,
    };
  }

  handleHChange = (value: number[]) => {
    const h = value[0];
    const newHex = hslToHex(h, this.state.s, this.state.l);
    this.newSetHex(newHex)
    this.setState({ h });
  };

  handleSChange = (value: number) => {
    const s = value;
    const newHex = hslToHex(this.state.h, s, this.state.l);
    this.newSetHex(newHex)
    this.setState({ s });
  };

  handleLChange = (value: number) => {
    const l = value;
    const newHex = hslToHex(this.state.h, this.state.s, l);
    this.newSetHex(newHex);
    this.setState({ l });
  };

  handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = event.target.value;
    if (/^#[0-9A-Fa-f]{3,6}$/.test(newHex)) {
      const [h, s, l] = hexToHsl(newHex);
      this.newSetHex(newHex)
      this.setState({ h, s, l });
      return 
    }

    this.newSetHex(newHex)
  };

  onMouseMoveOnColorPicker(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newS = (x / rect.width) * 100;
    const newL = 100 - (y / rect.height) * 100;
    this.handleSChange(newS);
    this.handleLChange(newL);
  }

  render() {
    const { h, s, l, hex } = this.state;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start text-left font-normal">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: hex }} />
            <span>{hex}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-4">
          <div className="flex flex-col gap-4">
            <div className="w-full h-[120px] rounded-md relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, black, transparent), linear-gradient(to right, white, ${hslToHex(h, 100, 50)})`,
                }}
                onMouseMove={this.onMouseMoveOnColorPicker.bind(this)}
              />
              <div
                className="absolute w-4 h-4 rounded-full border border-white shadow-lg cursor-pointer"
                style={{
                  left: `${s}%`,
                  top: `${100 - l}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>

            <div className="w-full relative h-4">
              <div
                className="w-full h-full rounded-full absolute bg-gradient-to-r"
                style={{
                  backgroundImage: 'linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)'
                }}
              />
              <Slider
                value={[h]}
                max={360}
                step={1}
                onValueChange={this.handleHChange}
                className="h-full"
              />
            </div>

            <Input
              style={
                {
                  color: "white"
                }
              }
              value={hex}
              onChange={this.handleHexChange}
              className="w-full text-center"
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
}

export default ColorPicker;