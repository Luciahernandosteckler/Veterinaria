"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
class Paciente {
    constructor(id, nombre, especie, idPropietario) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.idPropietario = idPropietario;
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
    getEspecie() {
        return this.especie;
    }
    setEspecie(especie) {
        this.especie = especie;
    }
    getIdPropietario() {
        return this.idPropietario;
    }
    setIdPropietario(idPropietario) {
        this.idPropietario = idPropietario;
    }
}
exports.Paciente = Paciente;
