"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
var Paciente = /** @class */ (function () {
    function Paciente(id, nombre, especie, idPropietario) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.idPropietario = idPropietario;
    }
    //GETTERS Y SETTERS
    Paciente.prototype.getId = function () {
        return this.id;
    };
    Paciente.prototype.setId = function (id) {
        this.id = id;
    };
    Paciente.prototype.getNombre = function () {
        return this.nombre;
    };
    Paciente.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Paciente.prototype.getEspecie = function () {
        return this.especie;
    };
    Paciente.prototype.setEspecie = function (especie) {
        this.especie = especie;
    };
    Paciente.prototype.getIdPropietario = function () {
        return this.idPropietario;
    };
    Paciente.prototype.setIdPropietario = function (idPropietario) {
        this.idPropietario = idPropietario;
    };
    return Paciente;
}());
exports.Paciente = Paciente;
