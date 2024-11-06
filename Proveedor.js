"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
class Proveedor {
    constructor(id, nombre, contacto) {
        this.id = id;
        this.nombre = nombre;
        this.contacto = contacto;
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
