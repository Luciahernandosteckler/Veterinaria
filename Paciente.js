"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
class Paciente {
    constructor(nombre, especie, idPropietario) {
        this.id = Paciente.incrementarId();
        this.nombre = nombre;
        this.setEspecie(especie);
        this.idPropietario = idPropietario;
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
    getEspecie() {
        return this.especie;
    }
    setEspecie(especie) {
        if (especie != "perro" && especie != "gato") {
            this.especie = "exotica";
        }
        else {
            this.especie = especie;
        }
    }
    getIdPropietario() {
        return this.idPropietario;
    }
    setIdPropietario(idPropietario) {
        this.idPropietario = idPropietario;
    }
}
exports.Paciente = Paciente;
Paciente.idActual = 0;
