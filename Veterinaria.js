"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinaria = void 0;
class Veterinaria {
    constructor(id, nombre, direccion) {
        this.clientes = [];
        this.pacientes = [];
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
    }
    // METODOS CLIENTE //
    obtenerClientes() {
        return this.clientes;
    }
    agregarCliente(cliente) {
        this.clientes.push(cliente);
    }
    modificarCliente(id, nuevosDatos) {
        const cliente = this.clientes.find((cli) => cli.getId() === id);
        if (cliente) {
            Object.assign(cliente, nuevosDatos);
        }
    }
    eliminarCliente(id) {
        this.clientes = this.clientes.filter((cli) => cli.getId() !== id);
    }
    // METODOS PACIENTE //
    agregarPaciente(paciente) {
        const idPaciente = paciente.getId();
        const existe = this.pacientes.some((pac) => pac.getId() === idPaciente);
        if (!existe) {
            this.pacientes.push(paciente);
        }
        else {
            console.log(`El paciente ${paciente.getNombre()} ya existe.`);
        }
    }
    // eliminarPaciente(paciente: Paciente): void{}; //ToDo implementar.
    // modificarPaciente(paciente: Paciente): void{}; //ToDo implementar
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
    getDireccion() {
        return this.direccion;
    }
    setDireccion(direccion) {
        this.direccion = direccion;
    }
}
exports.Veterinaria = Veterinaria;
