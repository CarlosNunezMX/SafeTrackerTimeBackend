export default class LocationNotExists extends Error {
  constructor() {
    super("Los datos de localización del usuario inidicado no existen!");
  }
};

export class LacationValidationError extends Error {
  constructor(){
    super("Se requiere el usuario a localizar!");
  }
}