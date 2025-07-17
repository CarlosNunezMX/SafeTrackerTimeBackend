export default class NotAuthorizedError extends Error{
    constructor(){
        super("Requieres permisos de administrador para acceder a este recurso!");
    }
}