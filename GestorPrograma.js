"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorPrograma = void 0;
const rls = __importStar(require("readline-sync"));
const Clientes_1 = require("./Clientes");
const Paciente_1 = require("./Paciente");
const Veterinaria_1 = require("./Veterinaria");
class GestorPrograma {
    constructor(nombre) {
        this.listaClientes = [];
        this.listaVeterinarias = [];
        this.nombre = nombre;
    }
    //Menu principal identificacion (Administrador o Cliente)
    opcionesGestorVeterinarias() {
        //console.clear()
        let opcionSeleccionada;
        this.mensajeOpciones("Bienvenido al Gestor de Veterinarias");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Soy Administrador \n 2 - Soy Cliente\n 3 - Salir", 1, 3);
            switch (opcionSeleccionada) {
                case 1:
                    this.ejecutarComoAdministrador();
                    break;
                case 2:
                    this.comprobarCliente();
                    break;
                case 3:
                    console.log("Saliendo...");
                    break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !== 3);
    }
    //Menu para Administradores
    ejecutarComoAdministrador() {
        console.clear();
        let opcionSeleccionada;
        this.mensajeOpciones("Bienvenido administrador");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Gestor de Veterinarias \n 2 - Gestor de Proovedores\n 3 - Gestor de Clientes\n 4 - Gestor de Pacientes \n 5 - Volver ", 1, 5);
            switch (opcionSeleccionada) {
                case 1:
                    this.gestorVeterinarias();
                    break;
                case 2:
                    this.gestorProveedores();
                    break;
                case 3:
                    this.gestorClientes();
                    break;
                case 4:
                    this.gestorPacientes();
                    break;
                case 5:
                    console.log("Volviendo...");
                    console.clear();
                    break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !== 5);
    }
    ;
    //Comprueba si el cliente existe ya o no y dependiende de eso le muestra un Menu diferente
    comprobarCliente() {
        //verifica que haya veterinarias creadas previamente.
        if (this.listaVeterinarias.length != 0) {
            console.clear();
            let dniCliente = rls.questionInt("Ingrese su dni: ");
            let cliente = this.buscarClientePorDni(dniCliente);
            if (cliente !== null) {
                this.ejecutarComoCliente(cliente);
            }
            else {
                let opcionSeleccionada;
                this.mensajeOpciones("No se encontro ningun cliente con dicho Dni");
                do {
                    opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Cliente \n 2 - Ingresar Dni nuevamente\n 3 - Volver", 1, 3);
                    switch (opcionSeleccionada) {
                        case 1:
                            this.crearNuevoCliente(dniCliente);
                            break;
                        case 2:
                            this.comprobarCliente();
                            opcionSeleccionada = 3;
                            break;
                        case 3:
                            console.log("Volviendo...");
                            console.clear();
                            break;
                        default: console.log("Error de Datos");
                    }
                } while (opcionSeleccionada !== 3);
            }
        }
        else {
            console.log("No hay veterinarias creadas aun, contactese con un Administrador");
            this.esperarEnter();
            console.clear();
        }
    }
    ;
    //Comprueba si el cliente ya existe a partir de su Dni.
    buscarClientePorDni(dni) {
        let clienteEncontrado = null;
        this.listaClientes.forEach(cliente => {
            if (clienteEncontrado === null && cliente.getDni() === dni) {
                clienteEncontrado = cliente;
            }
        });
        return clienteEncontrado;
    }
    //Menu para clientes.
    ejecutarComoCliente(cliente) {
        console.clear();
        let opcionSeleccionada;
        this.mensajeOpciones("Bienvenido " + cliente.getNombre());
        if (cliente.getMascotas().length <= 0 || cliente.getNumeroVisitas() == 0) {
            do {
                opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3 - Volver", 1, 3);
                switch (opcionSeleccionada) {
                    case 1:
                        console.log(` Nombre: ${cliente.getNombre()}\n Dni: ${cliente.getDni()}\n Telefono ${cliente.getTelefono()}`);
                        this.esperarEnter();
                        break;
                    case 2:
                        if (cliente.getMascotas().length == 0) {
                            console.log("Aun no a Cargado ninguna mascota");
                            this.crearNuevaMascota(cliente);
                        }
                        else {
                            console.log(cliente.getMascotas());
                        }
                        ;
                        this.esperarEnter();
                        break;
                    case 3:
                        console.log("Volviendo...");
                        break;
                    default: console.log("Error de Datos");
                }
            } while (opcionSeleccionada !== 3);
        }
        else {
            do {
                opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3- Salir", 1, 3);
                switch (opcionSeleccionada) {
                    case 1:
                        console.log(` Nombre: ${cliente.getNombre()}\n Dni: ${cliente.getDni()}\n Telefono ${cliente.getTelefono()}`);
                        this.esperarEnter();
                        break;
                    case 2:
                        this.listarMascotas(cliente);
                        this.esperarEnter();
                        break;
                    case 3:
                        console.log("Saliendo...");
                        break;
                    default: console.log("Error de Datos");
                }
            } while (opcionSeleccionada !== 3);
        }
    }
    crearNuevaMascota(cliente) {
        console.clear();
        let id = "1";
        let nombre = rls.question("Ingrese Nombre de su Mascota: ");
        let especie = rls.question("Ingrese Especie de su Mascota: ");
        let idPropietario = cliente.getId();
        const mascota = new Paciente_1.Paciente(nombre, especie, idPropietario);
        cliente.setMascotas(mascota);
        console.log("Mascota Agregada Exitosamente");
        this.esperarEnter();
        this.ejecutarComoCliente(cliente);
    }
    listarMascotas(cliente) {
        console.clear();
        let mascotas = cliente.getMascotas();
        if (mascotas.length == 0) {
            console.log("No hay mascotas para mostrar");
        }
        else {
            return mascotas;
        }
    }
    crearNuevoCliente(dni) {
        console.clear();
        let id = "5";
        let nombre = rls.question("Ingrese su Nombre: ");
        let telefono = rls.questionInt("Ingrese su Telefono: ");
        const cliente = new Clientes_1.Cliente(nombre, telefono, dni);
        this.listaClientes.push(cliente);
        console.log("Cliente Creado Exitosamente");
        this.esperarEnter();
        this.ejecutarComoCliente(cliente);
    }
    gestorVeterinarias() {
        console.clear();
        let opcionSeleccionada;
        this.mensajeOpciones("Aqui podra Crear o Modificar Veterinarias");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nueva Veterinaria \n 2 - Ver Lista de Veterinarias\n 3 - Modificar Veterinaria \n 4 - Eliminar Veterinaria\n 5 - Volver", 1, 5);
            switch (opcionSeleccionada) {
                case 1:
                    this.crearVeterinaria();
                    break;
                case 2:
                    this.listarVeterinarias();
                    break;
                case 3:
                    this.modificarVeterinaria();
                    break;
                case 4:
                    this.eliminarVeterinaria();
                    break;
                case 5:
                    console.log("Volviendo...");
                    console.clear();
                    break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !== 5);
    }
    ;
    //CRUD Veterinarias
    crearVeterinaria() {
        console.clear();
        let id = "1";
        let nombre = rls.question("Ingrese el nombre de la Veterinaria: ");
        console.log("Ingrese Direccion de la Veterinaria: ");
        let calle = rls.question("Calle: ");
        let numero = rls.questionInt("Numero: ");
        let direccion = `${calle} : ${numero}`;
        const veterinaria = new Veterinaria_1.Veterinaria(nombre, direccion);
        this.listaVeterinarias.push(veterinaria);
        console.log(`Veterinaria: ${veterinaria.getNombre()}, Agregada Exitosamente`);
        this.esperarEnter();
        console.clear();
    }
    listarVeterinarias() {
        console.clear();
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay veterinarias registradas.");
        }
        else {
            console.log("\n--- Lista de Veterinarias ---");
            this.listaVeterinarias.forEach((vet, index) => {
                console.log(`${index + 1}. Veterinaria: ${vet.getNombre()} Direccion - ${vet.getDireccion()}`);
            });
        }
        this.esperarEnter();
        console.clear();
    }
    modificarVeterinaria() {
        this.listarVeterinarias();
        let id = rls.questionInt("Ingrese el numero de la Veterinaria que desee modificar: ") - 1;
        if (id < 0 || id > this.listaVeterinarias.length - 1) {
            console.log("Numero Invalido");
            this.esperarEnter();
        }
        else {
            let veterinaria = this.listaVeterinarias[id];
            console.log(`Veterinaria: ${veterinaria.getNombre()} Direccion: ${veterinaria.getDireccion()}`);
            let nuevoNombre = rls.question("Ingrese nueva nombre (o presione Enter para no modificar): ");
            let nuevaCalle = rls.question("Ingrese nueva calle (o presione Enter para no modificar): ");
            let nuevaNumeracion = rls.questionInt("Ingrese nueva numeracion (o ingrese 0 para no modificar): ");
            if (nuevoNombre) {
                veterinaria.setNombre(nuevoNombre);
                console.log("Nombre Modificado Correctamente");
            }
            if (nuevaCalle && nuevaNumeracion != 0) {
                veterinaria.setDireccion(`${nuevaCalle} ${nuevaNumeracion}`);
                console.log("Direccion modificada correctamente ");
            }
            ;
            this.esperarEnter();
            console.clear();
        }
    }
    eliminarVeterinaria() {
        this.listarVeterinarias();
        let id = rls.questionInt("Ingrese el numero de la Veterinaria que desee eliminar: ") - 1;
        if (id < 0 || id > this.listaVeterinarias.length - 1) {
            console.log("Numero Invalido");
            this.esperarEnter();
        }
        else {
            let veterinaria = this.listaVeterinarias[id];
            console.log(`Veterinaria: ${veterinaria.getNombre()} Direccion: ${veterinaria.getDireccion()}`);
            let opcionSeleccionada;
            if (rls.keyInYNStrict(`¿Está seguro que desea eliminar la ${veterinaria.constructor.name}?`)) {
                // Elimina el vehículo de la lista
                this.listaVeterinarias = this.listaVeterinarias.filter(v => v !== veterinaria);
                console.log(`${veterinaria.constructor.name} eliminado con éxito.`);
            }
            else {
                console.log("Eliminación cancelada.");
            }
        }
    }
    confirmarEliminacionVeterinaria() {
    }
    gestorProveedores() {
        console.clear();
        let opcionSeleccionada;
        this.mensajeOpciones("Aqui podra Crear o Modificar Proveedores");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nueva Proveedor \n 2 - Ver Lista de Proovedores\n 3 - Modificar Proveedor \n 4 - Eliminar Proveedor\n 5 - Volver", 1, 5);
            switch (opcionSeleccionada) {
                case 1:
                    this.crearProveedor();
                    break;
                case 2:
                    this.listarProveedores();
                    break;
                case 3:
                    this.modificarProveedor();
                    break;
                case 4:
                    this.eliminarProveedor();
                    break;
                case 5:
                    console.log("Volviendo...");
                    console.clear();
                    break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !== 5);
    }
    ;
    //CRUD Proveedores
    crearProveedor() { }
    listarProveedores() { }
    modificarProveedor() { }
    eliminarProveedor() { }
    gestorClientes() {
        console.clear();
        let opcionSeleccionada;
        this.mensajeOpciones("Aqui podra Crear o Modificar Clientes");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nueva Cliente \n 2 - Ver Lista de Clientes\n 3 - Modificar Cliente \n 4 - Eliminar Cliente\n 5 - Volver", 1, 5);
            switch (opcionSeleccionada) {
                case 1:
                    this.crearCliente();
                    break;
                case 2:
                    this.listarClientes();
                    break;
                case 3:
                    this.modificarCliente();
                    break;
                case 4:
                    this.eliminarCliente();
                    break;
                case 5:
                    console.log("Volviendo...");
                    console.clear();
                    break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !== 5);
    }
    ;
    //CRUD Clientes
    crearCliente() { }
    listarClientes() { }
    modificarCliente() { }
    eliminarCliente() { }
    gestorPacientes() {
        console.clear();
        let opcionSeleccionada;
        this.mensajeOpciones("Aqui podra Crear o Modificar Pacientes");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nueva Paciente \n 2 - Ver Lista de Pacientes\n 3 - Modificar Paciente \n 4 - Eliminar Paciente\n 5 - Volver", 1, 5);
            switch (opcionSeleccionada) {
                case 1:
                    this.crearPaciente();
                    break;
                case 2:
                    this.listarPacientes();
                    break;
                case 3:
                    this.modificarPaciente();
                    break;
                case 4:
                    this.eliminarPaciente();
                    break;
                case 5:
                    console.log("Volviendo...");
                    console.clear();
                    break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !== 5);
    }
    ;
    //CRUD Pacientes
    crearPaciente() { }
    listarPacientes() { }
    modificarPaciente() { }
    eliminarPaciente() { }
    //Funcion que Recibe mensaje y Opciones disponibles
    menuOpciones(mensaje, min, max) {
        let opcionSeleccionada;
        do {
            console.log(mensaje);
            opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
        } while (opcionSeleccionada < min || opcionSeleccionada > max);
        return opcionSeleccionada;
    }
    //Funcion para personalizar el mensaje de Opciones
    mensajeOpciones(mensaje) {
        console.clear();
        console.log(mensaje);
        console.log("-------------------------------------");
        console.log("Ingrese La Opcion Que Desee");
    }
    //Funcion para pedirle una entrada de Enter al usuario antes de seguir
    esperarEnter() {
        rls.question("Presione Enter para continuar...");
    }
}
exports.GestorPrograma = GestorPrograma;
