"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
class Proveedor {
    constructor(nombre, contacto) {
        this.id = Proveedor.incrementarId();
        this.nombre = nombre;
        this.contacto = contacto;
    }
    static incrementarId() {
        return (++this.idActual).toString();
    }
    //GETTERS Y SETTERS
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getContacto() {
        return this.contacto;
    }
    setContacto(contacto) {
        this.contacto = contacto;
    }
}
exports.Proveedor = Proveedor;
Proveedor.idActual = 0;
