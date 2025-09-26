const POLEGADAS_IN_PIXEL = 2.54

export function pixelsParaCentimetros(pixels: number, dpi: number = 96): number {
  const polegadas = pixelsParaPolegadas(pixels, dpi);
  const centimetros = polegadas * POLEGADAS_IN_PIXEL;
  return centimetros;
}

export function pixelsParaPolegadas(pixels: number, dpi: number = 96): number {
  if (dpi <= 0) {
    throw new Error("O valor de DPI deve ser maior que zero.");
  }
  return pixels / dpi;
}

export function polegadasParaPixel(polegadas: number, dpi: number = 96) {
  if (dpi <= 0) {
    throw new Error("O valor de DPI deve ser maior que zero.");
  }
  return polegadas * dpi;
}

export function centimetroParaPolegadas(centimetros: number): number {
    return centimetros / POLEGADAS_IN_PIXEL
}