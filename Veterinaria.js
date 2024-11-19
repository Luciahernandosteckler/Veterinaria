"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinaria = void 0;
var Veterinaria = /** @class */ (function () {
    function Veterinaria(nombre, direccion) {
        this.clientes = [];
        this.pacientes = [];
        this.id = Veterinaria.incrementarId();
        this.nombre = nombre;
        this.direccion = direccion;
    }
    Veterinaria.incrementarId = function () {
        return (++this.idActual).toString();
    };
    // METODOS CLIENTE //
    Veterinaria.prototype.obtenerClientes = function () {
        return this.clientes;
    };
    Veterinaria.prototype.agregarCliente = function (cliente) {
        this.clientes.push(cliente);
    };
    Veterinaria.prototype.modificarCliente = function (id, clienteNuevo) {
        //Buscamos el cliente que corresponda al id ingresado por parametro.
        var cliente = this.clientes.find(function (cli) { return cli.getId() === id; });
        //Se reemplaza el antiguo cliente por el nuevo cliente ingresado por parametro
        cliente = clienteNuevo;
    };
    Veterinaria.prototype.eliminarCliente = function (id) {
        this.clientes = this.clientes.filter(function (cli) { return cli.getId() !== id; });
    };
    // METODOS PACIENTE //
    Veterinaria.prototype.agregarPaciente = function (paciente) {
        var idPaciente = paciente.getId();
        var existe = this.pacientes.some(function (pac) { return pac.getId() === idPaciente; });
        if (!existe) {
            this.pacientes.push(paciente);
        }
        else {
            console.log("El paciente ".concat(paciente.getNombre(), " ya existe."));
        }
    };
    // eliminarPaciente(paciente: Paciente): void{}; //ToDo implementar.
    // modificarPaciente(paciente: Paciente): void{}; //ToDo implementar
    //GETTERS Y SETTERS
    Veterinaria.prototype.getId = function () {
        return this.id;
    };
    Veterinaria.prototype.setId = function (id) {
        this.id = id;
    };
    Veterinaria.prototype.getNombre = function () {
        return this.nombre;
    };
    Veterinaria.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Veterinaria.prototype.getDireccion = function () {
        return this.direccion;
    };
    Veterinaria.prototype.setDireccion = function (direccion) {
        this.direccion = direccion;
    };
    Veterinaria.idActual = 0;
    return Veterinaria;
}());
exports.Veterinaria = Veterinaria;
