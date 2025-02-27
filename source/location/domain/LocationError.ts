export default class LocationNotExists extends Error {
  constructor() {
    super("Los datos de localización del usuario inidicado no existen!");
  }
};
