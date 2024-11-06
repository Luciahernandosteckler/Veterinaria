"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(id, nombre, telefono) {
        this.numeroVisitas = 0;
        this.esVIP = false;
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
    }
    //METODOS
    incrementarVisitas() {
        this.numeroVisitas++;
        this.esVIP = this.numeroVisitas >= 5;
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
    getTelefono() {
        return this.telefono;
    }
    setTelefono(telefono) {
        this.telefono = telefono;
    }
    getNumeroVisitas() {
        return this.numeroVisitas;
    }
    setNumeroVisitas(numeroVisitas) {
        this.numeroVisitas = numeroVisitas;
    }
    isEsVIP() {
        return this.esVIP;
    }
    setEsVIP(esVIP) {
        this.esVIP = esVIP;
    }
}
exports.Cliente = Cliente;
