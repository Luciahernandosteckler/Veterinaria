"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
var Paciente = /** @class */ (function () {
    function Paciente(nombre, especie, idPropietario) {
        this.id = Paciente.incrementarId();
        this.nombre = nombre;
        this.setEspecie(especie);
        this.idPropietario = idPropietario;
    }
    Paciente.incrementarId = function () {
        return (++this.idActual).toString();
    };
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
        if (especie != "perro" && especie != "gato") {
            this.especie = "exotica";
        }
        else {
            this.especie = especie;
        }
    };
    Paciente.prototype.getIdPropietario = function () {
        return this.idPropietario;
    };
    Paciente.prototype.setIdPropietario = function (idPropietario) {
        this.idPropietario = idPropietario;
    };
    Paciente.idActual = 0;
    return Paciente;
}());
exports.Paciente = Paciente;
