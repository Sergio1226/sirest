interface TipoProducto {
  estadoTipoProducto: number;
  id: number;
  nombreTipoProducto: string;
}

interface DetalleMenu {
  id: number;
  descripcionIngrediente: string;
  tiposProducto: TipoProducto;
}

interface Restaurante {
  codigoLugar: number;
  id: number;
  nombreRestaurante: string;
}

interface TipoConsumo {
  estadoTipoConsumo: number;
  id: number;
  ntipoConsumo: string;
}

export interface MenuData {
  id: number;
  descripcionMenu: string;
  fechaProgramada: number;
  estadoMenu: number;
  idTerceroNutricion: number;
  restaurantes: Restaurante;
  tiposConsumo: TipoConsumo;
  detallesMenus: DetalleMenu[];
}