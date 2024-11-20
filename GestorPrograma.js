"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorPrograma = void 0;
var rls = require("readline-sync");
var Clientes_1 = require("./Clientes");
var Paciente_1 = require("./Paciente");
var Proveedor_1 = require("./Proveedor");
var Veterinaria_1 = require("./Veterinaria");
var GestorPrograma = /** @class */ (function () {
    function GestorPrograma(nombre) {
        this.listaClientes = [];
        this.listaVeterinarias = [];
        this.nombre = nombre;
    }
    //Menu principal identificacion (Administrador o Cliente)
    GestorPrograma.prototype.opcionesGestorVeterinarias = function () {
        //console.clear();
        var opcionSeleccionada;
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
    };
    //Menu para Administradores
    GestorPrograma.prototype.ejecutarComoAdministrador = function () {
        console.clear();
        var opcionSeleccionada;
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
    };
    ;
    //Comprueba si el cliente existe ya o no y dependiende de eso le muestra un Menu diferente
    GestorPrograma.prototype.comprobarCliente = function () {
        //verifica que haya veterinarias creadas previamente.
        if (this.listaVeterinarias.length != 0) {
            console.clear();
            var dniCliente = rls.questionInt("Ingrese su dni: ");
            var cliente = this.buscarClientePorDni(dniCliente);
            if (cliente !== null) {
                this.ejecutarComoCliente(cliente);
            }
            else {
                var opcionSeleccionada = void 0;
                this.mensajeOpciones("No se encontro ningun cliente con dicho Dni");
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
            }
        }
        else {
            console.log("No hay veterinarias creadas aun, contactese con un Administrador");
            this.esperarEnter();
            console.clear();
        }
    };
    ;
    //Comprueba si el cliente ya existe a partir de su Dni.
    GestorPrograma.prototype.buscarClientePorDni = function (dni) {
        var clienteEncontrado = null;
        this.listaClientes.forEach(function (cliente) {
            if (clienteEncontrado === null && cliente.getDni() === dni) {
                clienteEncontrado = cliente;
            }
        });
        return clienteEncontrado;
    };
    //Menu para clientes.
    GestorPrograma.prototype.ejecutarComoCliente = function (cliente) {
        console.clear();
        var opcionSeleccionada;
        this.mensajeOpciones("Bienvenido " + cliente.getNombre());
        if (cliente.getMascotas().length <= 0 || cliente.getNumeroVisitas() == 0) {
            opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3 - Volver", 1, 3);
            do {
                switch (opcionSeleccionada) {
                    case 1:
                        console.log(" Nombre: ".concat(cliente.getNombre(), "\n Dni: ").concat(cliente.getDni(), "\n Telefono ").concat(cliente.getTelefono()));
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
            opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3- Salir", 1, 3);
            do {
                switch (opcionSeleccionada) {
                    case 1:
                        console.log(" Nombre: ".concat(cliente.getNombre(), "\n Dni: ").concat(cliente.getDni(), "\n Telefono ").concat(cliente.getTelefono()));
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
    };
    GestorPrograma.prototype.crearNuevaMascota = function (cliente) {
        console.clear();
        var id = "1";
        var nombre = rls.question("Ingrese Nombre de su Mascota: ");
        var especie = rls.question("Ingrese Especie de su Mascota: ");
        var idPropietario = cliente.getId();
        var mascota = new Paciente_1.Paciente(nombre, especie, idPropietario);
        cliente.setMascotas(mascota);
        console.log("Mascota Agregada Exitosamente");
        this.esperarEnter();
        this.ejecutarComoCliente(cliente);
    };
    GestorPrograma.prototype.listarMascotas = function (cliente) {
        console.clear();
        var mascotas = cliente.getMascotas();
        if (mascotas.length == 0) {
            console.log("No hay mascotas para mostrar");
        }
        else {
            return mascotas;
        }
    };
    GestorPrograma.prototype.crearNuevoCliente = function (dni) {
        console.clear();
        var id = "5";
        var nombre = rls.question("Ingrese su Nombre: ");
        var telefono = rls.questionInt("Ingrese su Telefono: ");
        var cliente = new Clientes_1.Cliente(nombre, telefono, dni);
        this.listaClientes.push(cliente);
        console.log("Cliente Creado Exitosamente");
        this.esperarEnter();
        this.ejecutarComoCliente(cliente);
    };
    GestorPrograma.prototype.gestorVeterinarias = function () {
        console.clear();
        var opcionSeleccionada;
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
    };
    ;
    //CRUD Veterinarias
    GestorPrograma.prototype.crearVeterinaria = function () {
        console.clear();
        var nombre = rls.question("Ingrese el nombre de la Veterinaria: ");
        console.log("Ingrese Direccion de la Veterinaria: ");
        var calle = rls.question("Calle: ");
        var numero = rls.questionInt("Numero: ");
        var direccion = "".concat(calle, " : ").concat(numero);
        var veterinaria = new Veterinaria_1.Veterinaria(nombre, direccion);
        this.listaVeterinarias.push(veterinaria);
        console.log("Veterinaria: ".concat(veterinaria.getNombre(), ", Agregada Exitosamente"));
        this.esperarEnter();
        console.clear();
        if (rls.keyInYNStrict("Desea agregar otra: ".concat(veterinaria.constructor.name))) {
            //Ejecuta nuevamente el Metodo crearVeterinaria 
            this.crearVeterinaria();
        }
    };
    GestorPrograma.prototype.listarVeterinarias = function () {
        console.clear();
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay veterinarias registradas.");
        }
        else {
            console.log("\n--- Lista de Veterinarias ---");
            this.listaVeterinarias.forEach(function (vet, index) {
                console.log("".concat(index + 1, ". Veterinaria: ").concat(vet.getNombre(), " Direccion - ").concat(vet.getDireccion()));
            });
        }
        this.esperarEnter();
        console.clear();
    };
    GestorPrograma.prototype.modificarVeterinaria = function () {
        this.listarVeterinarias();
        var id = rls.questionInt("Ingrese el numero de la Veterinaria que desee modificar: ") - 1;
        if (id < 0 || id > this.listaVeterinarias.length - 1) {
            console.log("Numero Invalido");
            this.esperarEnter();
        }
        else {
            var veterinaria = this.listaVeterinarias[id];
            console.log("Veterinaria: ".concat(veterinaria.getNombre(), " Direccion: ").concat(veterinaria.getDireccion()));
            var nuevoNombre = rls.question("Ingrese nuevo nombre (o presione Enter para no modificar): ");
            var nuevaCalle = rls.question("Ingrese nueva calle (o presione Enter para no modificar): ");
            var nuevaNumeracion = rls.questionInt("Ingrese nueva numeracion (o ingrese 0 para no modificar): ");
            if (nuevoNombre) {
                veterinaria.setNombre(nuevoNombre);
                console.log("Nombre Modificado Correctamente");
            }
            if (nuevaCalle && nuevaNumeracion != 0) {
                veterinaria.setDireccion("".concat(nuevaCalle, " ").concat(nuevaNumeracion));
                console.log("Direccion modificada correctamente ");
            }
            ;
            this.esperarEnter();
            console.clear();
            if (rls.keyInYNStrict("Desea modificar otra: ".concat(veterinaria.constructor.name))) {
                //Ejecuta nuevamente el Metodo modificarVeterinaria 
                this.modificarVeterinaria();
            }
        }
    };
    GestorPrograma.prototype.eliminarVeterinaria = function () {
        this.listarVeterinarias();
        var id = rls.questionInt("Ingrese el numero de la Veterinaria que desee eliminar: ") - 1;
        if (id < 0 || id > this.listaVeterinarias.length - 1) {
            console.log("Numero Invalido");
            this.esperarEnter();
        }
        else {
            var veterinaria_1 = this.listaVeterinarias[id];
            console.log("Veterinaria: ".concat(veterinaria_1.getNombre(), " Direccion: ").concat(veterinaria_1.getDireccion()));
            var opcionSeleccionada = void 0;
            if (rls.keyInYNStrict("Esta seguro que desea eliminar la ".concat(veterinaria_1.constructor.name))) {
                // Elimina el vehículo de la lista
                this.listaVeterinarias = this.listaVeterinarias.filter(function (v) { return v !== veterinaria_1; });
                console.log("".concat(veterinaria_1.constructor.name, " eliminado con \u00E9xito."));
            }
            else {
                console.log("Eliminación cancelada.");
            }
            if (rls.keyInYNStrict("Desea eliminar otra: ".concat(veterinaria_1.constructor.name))) {
                //Ejecuta nuevamente el Metodo eliminarVeterinaria 
                this.eliminarVeterinaria();
            }
        }
    };
    GestorPrograma.prototype.gestorProveedores = function () {
        console.clear();
        var opcionSeleccionada;
        this.mensajeOpciones("Aqui podra Crear o Modificar Proveedores");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Proveedor \n 2 - Ver Lista de Proovedores\n 3 - Modificar Proveedor \n 4 - Eliminar Proveedor\n 5 - Volver", 1, 5);
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
    };
    ;
    //CRUD Proveedores
    GestorPrograma.prototype.crearProveedor = function () {
        if (this.listaVeterinarias.length != 0) {
            this.listarVeterinarias();
            var id = rls.questionInt("Ingrese el numero de la Veterinaria al que desee asignar proveedor: ") - 1;
            if (id < 0 || id > this.listaVeterinarias.length - 1) {
                console.log("Numero Invalido");
                this.esperarEnter();
            }
            else {
                var veterinaria = this.listaVeterinarias[id];
                console.log("Veterinaria: ".concat(veterinaria.getNombre(), " Direccion: ").concat(veterinaria.getDireccion()));
                console.clear();
                var nombre = rls.question("Ingrese el nombre del Proveedor: ");
                var contacto = rls.question("Ingrese el numero telefonico del Proveedor: ");
                var proveedor = new Proveedor_1.Proveedor(nombre, contacto);
                veterinaria.setProveedor(proveedor);
                console.log("".concat(proveedor.constructor.name, ": ").concat(proveedor.getNombre(), ", Agregado Exitosamente a la ").concat(veterinaria.constructor.name, ": ").concat(veterinaria.getNombre()));
                this.esperarEnter();
                console.clear();
                if (rls.keyInYNStrict("Desea agregar otro: ".concat(proveedor.constructor.name, " a la ").concat(veterinaria.constructor.name, ": ").concat(veterinaria.getNombre()))) {
                    //Ejecuta nuevamente el Metodo crearProveedor
                    this.crearProveedor();
                }
            }
        }
        else {
            console.log("No hay Veterinarias Creadas aun, debera crear una para asignarle proovedores");
            this.esperarEnter();
            this.crearVeterinaria();
        }
    };
    GestorPrograma.prototype.listarProveedores = function () { };
    GestorPrograma.prototype.modificarProveedor = function () { };
    GestorPrograma.prototype.eliminarProveedor = function () { };
    GestorPrograma.prototype.gestorClientes = function () {
        console.clear();
        var opcionSeleccionada;
        this.mensajeOpciones("Aqui podra Crear o Modificar Clientes");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Cliente \n 2 - Ver Lista de Clientes\n 3 - Modificar Cliente \n 4 - Eliminar Cliente\n 5 - Volver", 1, 5);
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
    };
    ;
    //CRUD Clientes
    GestorPrograma.prototype.crearCliente = function () {
        // Validar si hay veterinarias creadas
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
            this.esperarEnter();
            this.crearVeterinaria();
            return; // Salir porque no se puede continuar
        }
        // Seleccionar veterinaria
        this.listarVeterinarias();
        var idVeterinaria = this.menuOpciones("Ingrese el número de la Veterinaria a la que desea asignar un Cliente: ", 1, this.listaVeterinarias.length) - 1; // Ajustar índice a base 0
        var veterinaria = this.listaVeterinarias[idVeterinaria];
        console.clear();
        console.log("Veterinaria seleccionada: ".concat(veterinaria.getNombre(), " (").concat(veterinaria.getDireccion(), ")"));
        // Crear cliente
        var nombre = rls.question("Ingrese el nombre del Cliente: ");
        var telefono = rls.questionInt("Ingrese el número telefónico del Cliente: ");
        var dni = rls.questionInt("Ingrese el DNI del Cliente: ");
        var cliente = new Clientes_1.Cliente(nombre, telefono, dni);
        // Asignar cliente a la veterinaria
        veterinaria.setCliente(cliente);
        console.log("Cliente ".concat(cliente.getNombre(), " agregado exitosamente a ").concat(veterinaria.getNombre(), "."));
        // Preguntar si desea agregar otro cliente
        if (rls.keyInYNStrict("Desea agregar otro: ".concat(cliente.constructor.name, " a la ").concat(veterinaria.constructor.name, ": ").concat(veterinaria.getNombre()))) {
            //Ejecuta nuevamente el Metodo crearProveedor
            this.crearClientePorVeterinaria(veterinaria);
        }
        else {
            this.gestorClientes();
        }
        console.clear();
    };
    GestorPrograma.prototype.crearClientePorVeterinaria = function (veterinaria) {
        console.clear();
        console.log("Veterinaria seleccionada: ".concat(veterinaria.getNombre(), " (").concat(veterinaria.getDireccion(), ")"));
        // Crear cliente
        var nombre = rls.question("Ingrese el nombre del Cliente: ");
        var telefono = rls.questionInt("Ingrese el número telefónico del Cliente: ");
        var dni = rls.questionInt("Ingrese el DNI del Cliente: ");
        var cliente = new Clientes_1.Cliente(nombre, telefono, dni);
        // Asignar cliente a la veterinaria
        veterinaria.setCliente(cliente);
        console.log("Cliente ".concat(cliente.getNombre(), " agregado exitosamente a ").concat(veterinaria.getNombre(), "."));
        // Preguntar si desea agregar otro cliente
        if (rls.keyInYNStrict("Desea agregar otro: ".concat(cliente.constructor.name, " a la ").concat(veterinaria.constructor.name, ": ").concat(veterinaria.getNombre()))) {
            //Ejecuta nuevamente el Metodo crearProveedor
            this.crearClientePorVeterinaria(veterinaria);
        }
        else {
            this.gestorClientes();
        }
        console.clear();
    };
    GestorPrograma.prototype.listarClientes = function () {
        // Validar si hay veterinarias creadas
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
            this.esperarEnter();
            this.crearVeterinaria();
            return; // Salir porque no se puede continuar
        }
        // Seleccionar veterinaria
        this.listarVeterinarias();
        var idVeterinaria = this.menuOpciones("Ingrese el número de la Veterinaria para ver sus Clientes: ", 1, this.listaVeterinarias.length) - 1; // Ajustar índice a base 0
        var veterinaria = this.listaVeterinarias[idVeterinaria];
        // Validar si hay clientes asociados
        var clientes = veterinaria.getCliente();
        if (clientes.length === 0) {
            console.log("No hay Clientes registrados en la Veterinaria ".concat(veterinaria.getNombre(), "."));
            if (rls.keyInYNStrict("Desea crear un nuevo cliente a la ".concat(veterinaria.constructor.name, ": ").concat(veterinaria.getNombre()))) {
                //Ejecuta nuevamente el Metodo crearProveedor
                this.crearCliente();
            }
            else {
                return; // Salir porque no hay nada que listar
            }
        }
        // Listar clientes
        console.log("Clientes registrados en ".concat(veterinaria.getNombre(), ":"));
        clientes.forEach(function (cliente, index) {
            console.log("".concat(index + 1, " - ").concat(cliente.getNombre(), " (Tel: ").concat(cliente.getTelefono(), ", DNI: ").concat(cliente.getDni(), ")"));
        });
        this.esperarEnter();
        console.clear();
        this.gestorClientes();
    };
    GestorPrograma.prototype.modificarCliente = function () { };
    GestorPrograma.prototype.eliminarCliente = function () { };
    GestorPrograma.prototype.gestorPacientes = function () {
        console.clear();
        var opcionSeleccionada;
        this.mensajeOpciones("Aqui podra Crear o Modificar Pacientes");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Paciente \n 2 - Ver Lista de Pacientes\n 3 - Modificar Paciente \n 4 - Eliminar Paciente\n 5 - Volver", 1, 5);
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
                    this.ejecutarComoAdministrador;
                    console.clear();
                    break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !== 5);
    };
    ;
    //CRUD Pacientes
    GestorPrograma.prototype.crearPaciente = function () {
        // Validar si existen veterinarias
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
            this.esperarEnter();
            this.crearVeterinaria();
            //return; // Salir porque no se puede continuar
        }
        // Seleccionar veterinaria
        this.listarVeterinarias();
        var idVeterinaria = this.menuOpciones("Ingrese el número de la Veterinaria a la que desea asignar el Paciente: ", 1, (this.listaVeterinarias.length));
        var veterinaria = this.listaVeterinarias[idVeterinaria - 1];
        // Validar si existen clientes en la veterinaria
        if (veterinaria.getCliente().length === 0) {
            console.log("No hay Clientes creados en esta Veterinaria. Cree uno para continuar.");
            this.esperarEnter();
            this.crearCliente();
            //return; // Salir porque no se puede continuar
        }
        // Seleccionar cliente
        var clientes = veterinaria.getCliente();
        this.listarClientes();
        var idCliente = this.menuOpciones("Ingrese el número del Cliente al que desea asignar el Paciente: ", 1, clientes.length);
        var cliente = clientes[idCliente - 1];
        // Crear paciente
        var nombre = rls.question("Ingrese el nombre de la Mascota: ");
        var tipo = rls.question("Ingrese el tipo de Mascota: ");
        var mascota = new Paciente_1.Paciente(nombre, tipo, cliente.getId());
        cliente.setMascotas(mascota);
        console.log("".concat(mascota.constructor.name, ": ").concat(mascota.getNombre(), " agregado exitosamente al ").concat(cliente.constructor.name, ": ").concat(cliente.getNombre(), " en la ").concat(veterinaria.constructor.name, ": ").concat(veterinaria.getNombre(), "."));
        this.esperarEnter();
        console.clear();
    };
    GestorPrograma.prototype.listarPacientes = function () { };
    GestorPrograma.prototype.modificarPaciente = function () { };
    GestorPrograma.prototype.eliminarPaciente = function () { };
    GestorPrograma.prototype.validarVeterinarias = function () {
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
            this.esperarEnter();
            this.crearVeterinaria();
            return null;
        }
        return this.listaVeterinarias[this.menuOpciones("Seleccione una Veterinaria: ", 1, this.listaVeterinarias.length) - 1];
    };
    //Funcion que Recibe mensaje y Opciones disponibles
    GestorPrograma.prototype.menuOpciones = function (mensaje, min, max) {
        var opcionSeleccionada;
        do {
            console.log(mensaje);
            opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
            console.clear();
        } while (opcionSeleccionada < min || opcionSeleccionada > max);
        return opcionSeleccionada;
    };
    //Funcion para personalizar el mensaje de Opciones
    GestorPrograma.prototype.mensajeOpciones = function (mensaje) {
        console.clear();
        console.log(mensaje);
        console.log("-------------------------------------");
        console.log("Ingrese La Opcion Que Desee");
    };
    //Funcion para pedirle una entrada de Enter al usuario antes de seguir
    GestorPrograma.prototype.esperarEnter = function () {
        rls.question("Presione Enter para continuar...");
    };
    return GestorPrograma;
}());
exports.GestorPrograma = GestorPrograma;
