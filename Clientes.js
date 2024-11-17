"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(nombre, telefono, dni) {
        this.mascotas = [];
        this.numeroVisitas = 0;
        this.esVIP = false;
        this.nombre = nombre;
        this.telefono = telefono;
        this.dni = dni;
        this.id = Cliente.incrementarId();
    }
    static incrementarId() {
        return (++this.idActual).toString();
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
    getDni() {
        return this.dni;
    }
    setDni(dni) {
        this.dni = dni;
    }
    getMascotas() {
        return this.mascotas;
    }
    setMascotas(mascota) {
        this.mascotas.push(mascota);
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
Cliente.idActual = 0;
