"use strict";
// RedVeterinarias.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedVeterinarias = exports.Proveedor = exports.Paciente = exports.Cliente = exports.Veterinaria = void 0;
class Veterinaria {
    constructor(id, nombre, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
    }
}
exports.Veterinaria = Veterinaria;
class Cliente {
    constructor(id, nombre, telefono, numeroVisitas = 0) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.numeroVisitas = numeroVisitas;
        this.esVip = this.numeroVisitas >= 5;
    }
    incrementarVisitas() {
        this.numeroVisitas++;
        this.esVip = this.numeroVisitas >= 5;
    }
}
exports.Cliente = Cliente;
class Paciente {
    constructor(id, nombre, especie, idPropietario) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.idPropietario = idPropietario;
    }
}
exports.Paciente = Paciente;
class Proveedor {
    constructor(id, nombre, contacto) {
        this.id = id;
        this.nombre = nombre;
        this.contacto = contacto;
    }
}
exports.Proveedor = Proveedor;
class RedVeterinarias {
    constructor() {
        this.veterinarias = [];
        this.clientes = [];
        this.pacientes = [];
        this.proveedores = [];
    }
    // Método para obtener la lista de clientes
    obtenerClientes() {
        return this.clientes;
    }
    agregarVeterinaria(veterinaria) {
        this.veterinarias.push(veterinaria);
    }
    agregarCliente(cliente) {
        this.clientes.push(cliente);
    }
    agregarPaciente(paciente) {
        const existe = this.pacientes.some(pac => pac.id === paciente.id);
        if (!existe) {
            this.pacientes.push(paciente);
        }
        else {
            console.log(`El paciente ${paciente.nombre} ya existe.`);
        }
    }
    agregarProveedor(proveedor) {
        this.proveedores.push(proveedor);
    }
    modificarCliente(id, nuevosDatos) {
        const cliente = this.clientes.find(cli => cli.id === id);
        if (cliente) {
            Object.assign(cliente, nuevosDatos);
        }
    }
    eliminarCliente(id) {
        this.clientes = this.clientes.filter(cli => cli.id !== id);
    }
    eliminarVeterinaria(id) {
        this.veterinarias = this.veterinarias.filter(vet => vet.id !== id);
    }
}
exports.RedVeterinarias = RedVeterinarias;
