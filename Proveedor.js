"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
var Proveedor = /** @class */ (function () {
    function Proveedor(nombre, contacto) {
        this.id = Proveedor.incrementarId();
        this.nombre = nombre;
        this.contacto = contacto;
    }
    Proveedor.incrementarId = function () {
        return (++this.idActual).toString();
    };
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
    Proveedor.idActual = 0;
    return Proveedor;
}());
exports.Proveedor = Proveedor;
