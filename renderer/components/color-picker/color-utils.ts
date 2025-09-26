export function hslToHex(hue: number, saturation: number, lightness: number): string {
  const lightnessNormalized = lightness / 100;
  const a = saturation * Math.min(lightnessNormalized, 1 - lightnessNormalized) / 100;

  const toHexComponent = (n: number): string => {
    const k = (n + hue / 30) % 12;
    const color = lightnessNormalized - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };

  return `#${toHexComponent(0)}${toHexComponent(8)}${toHexComponent(4)}`;
}

export function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = convertHexToRgb(hex);
  return calculateHslFromRgb(r, g, b);
}

function convertHexToRgb(hex: string): [number, number, number] {
  const hexValue = hex.startsWith('#') ? hex.slice(1) : hex;

  if (hexValue.length === 3) {
    return [
      parseInt(hexValue[0] + hexValue[0], 16),
      parseInt(hexValue[1] + hexValue[1], 16),
      parseInt(hexValue[2] + hexValue[2], 16),
    ];
  }

  return [
    parseInt(hexValue.substring(0, 2), 16),
    parseInt(hexValue.substring(2, 4), 16),
    parseInt(hexValue.substring(4, 6), 16),
  ];
}

function calculateHslFromRgb(r: number, g: number, b: number): [number, number, number] {
  const [rNormalized, gNormalized, bNormalized] = [r, g, b].map(c => c / 255);
  const max = Math.max(rNormalized, gNormalized, bNormalized);
  const min = Math.min(rNormalized, gNormalized, bNormalized);
  const delta = max - min;

  if (delta === 0) {
    return [0, 0, Math.round((max + min) / 2 * 100)];
  }

  const lightness = (max + min) / 2;
  const saturation = getSaturation(max, min, lightness);
  const hue = getHue(rNormalized, gNormalized, bNormalized, max, delta);

  return [Math.round(hue * 60), Math.round(saturation * 100), Math.round(lightness * 100)];
}

const getSaturation = (max: number, min: number, lightness: number): number => {
  const delta = max - min;
  return lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
};

const getHue = (r: number, g: number, b: number, max: number, delta: number): number => {
  if (max === r) return (g - b) / delta + (g < b ? 6 : 0);
  if (max === g) return (b - r) / delta + 2;
  return (r - g) / delta + 4;
};