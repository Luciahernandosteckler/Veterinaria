"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(nombre, telefono, dni) {
        this.mascotas = [];
        this.numeroVisitas = 0;
        this.esVIP = false;
        this.nombre = nombre;
        this.telefono = telefono;
        this.dni = dni;
        this.id = Cliente.incrementarId();
    }
    Cliente.incrementarId = function () {
        return (++this.idActual).toString();
    };
    //METODOS
    Cliente.prototype.incrementarVisitas = function () {
        this.numeroVisitas++;
        this.esVIP = this.numeroVisitas >= 5;
    };
    //GETTERS Y SETTERS
    Cliente.prototype.getId = function () {
        return this.id;
    };
    Cliente.prototype.setId = function (id) {
        this.id = id;
    };
    Cliente.prototype.getNombre = function () {
        return this.nombre;
    };
    Cliente.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Cliente.prototype.getDni = function () {
        return this.dni;
    };
    Cliente.prototype.setDni = function (dni) {
        this.dni = dni;
    };
    Cliente.prototype.getMascotas = function () {
        return this.mascotas;
    };
    Cliente.prototype.setMascotas = function (mascota) {
        this.mascotas.push(mascota);
    };
    Cliente.prototype.getTelefono = function () {
        return this.telefono;
    };
    Cliente.prototype.setTelefono = function (telefono) {
        this.telefono = telefono;
    };
    Cliente.prototype.getNumeroVisitas = function () {
        return this.numeroVisitas;
    };
    Cliente.prototype.setNumeroVisitas = function (numeroVisitas) {
        this.numeroVisitas = numeroVisitas;
    };
    Cliente.prototype.isEsVIP = function () {
        return this.esVIP;
    };
    Cliente.prototype.setEsVIP = function (esVIP) {
        this.esVIP = esVIP;
    };
    Cliente.idActual = 0;
    return Cliente;
}());
exports.Cliente = Cliente;
