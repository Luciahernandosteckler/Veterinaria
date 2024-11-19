"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinaria = void 0;
var Veterinaria = /** @class */ (function () {
    function Veterinaria(nombre, direccion) {
        this.listaClientes = [];
        this.listaPacientes = [];
        this.listaProveedores = [];
        this.id = Veterinaria.incrementarId();
        this.nombre = nombre;
        this.direccion = direccion;
    }
    Veterinaria.incrementarId = function () {
        return (++this.idActual).toString();
    };
    // METODOS CLIENTE //
    Veterinaria.prototype.obtenerClientes = function () {
        return this.listaClientes;
    };
    Veterinaria.prototype.agregarCliente = function (cliente) {
        this.listaClientes.push(cliente);
    };
    Veterinaria.prototype.modificarCliente = function (id, clienteNuevo) {
        //Buscamos el cliente que corresponda al id ingresado por parametro.
        var cliente = this.listaClientes.find(function (cli) { return cli.getId() === id; });
        //Se reemplaza el antiguo cliente por el nuevo cliente ingresado por parametro
        cliente = clienteNuevo;
    };
    Veterinaria.prototype.eliminarCliente = function (id) {
        this.listaClientes = this.listaClientes.filter(function (cli) { return cli.getId() !== id; });
    };
    // METODOS PACIENTE //
    Veterinaria.prototype.agregarPaciente = function (paciente) {
        var idPaciente = paciente.getId();
        var existe = this.listaPacientes.some(function (pac) { return pac.getId() === idPaciente; });
        if (!existe) {
            this.listaPacientes.push(paciente);
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
    Veterinaria.prototype.setProveedor = function (proveedor) {
        this.listaProveedores.push(proveedor);
    };
    Veterinaria.prototype.getProveedor = function () {
        return this.listaProveedores;
    };
    Veterinaria.prototype.setCliente = function (cliente) {
        this.listaClientes.push(cliente);
    };
    Veterinaria.prototype.getCliente = function () {
        return this.listaClientes;
    };
    Veterinaria.idActual = 0;
    return Veterinaria;
}());
exports.Veterinaria = Veterinaria;
