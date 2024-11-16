"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
var Proveedor = /** @class */ (function () {
    function Proveedor(id, nombre, contacto) {
        this.id = id;
        this.nombre = nombre;
        this.contacto = contacto;
    }
    //GETTERS Y SETTERS
    Proveedor.prototype.getId = function () {
        return this.id;
    };
    Proveedor.prototype.setId = function (id) {
        this.id = id;
    };
    Proveedor.prototype.getNombre = function () {
        return this.nombre;
    };
    Proveedor.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Proveedor.prototype.getContacto = function () {
        return this.contacto;
    };
    Proveedor.prototype.setContacto = function (contacto) {
        this.contacto = contacto;
    };
    return Proveedor;
}());
exports.Proveedor = Proveedor;
