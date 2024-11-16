"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clientes_1 = require("./Clientes");
var Paciente_1 = require("./Paciente");
var Proveedor_1 = require("./Proveedor");
var Veterinaria_1 = require("./Veterinaria");
var RedVeterinarias_1 = require("./RedVeterinarias");
var GestorPrograma_1 = require("./GestorPrograma");
// Crear instancia de la red de veterinarias
var redVeterinarias = new RedVeterinarias_1.RedVeterinarias();
// Crear instancia de veterinaria
var veterinaria1 = new Veterinaria_1.Veterinaria("1", "Veterinaria A", "Calle 123");
// 1. Agregar Veterinarias
console.log("Agregando veterinarias...");
redVeterinarias.agregarVeterinaria(veterinaria1);
console.log("Veterinarias después de agregar:", redVeterinarias);
// 2. Agregar Clientes a las veterinarias.
console.log("Agregando clientes...");
veterinaria1.agregarCliente(new Clientes_1.Cliente("1", "Juan", 15550055, 12345678));
veterinaria1.agregarCliente(new Clientes_1.Cliente("2", "María", 12312323, 98765421));
veterinaria1.agregarCliente(new Clientes_1.Cliente("3", "Pedro", 12312322, 55512456));
veterinaria1.agregarCliente(new Clientes_1.Cliente("4", "Luisa", 12312324, 44497654));
veterinaria1.agregarCliente(new Clientes_1.Cliente("5", "Pascual", 15434343, 22333123));
console.log("Clientes en veterinaria 1 después de agregar:", veterinaria1.obtenerClientes());
// Mostrar si los clientes de cierta veterinaria son VIP
console.log("Estado VIP de los clientes de veterinaria 1:");
veterinaria1.obtenerClientes().forEach(function (cliente) {
    console.log("".concat(cliente.getNombre(), " es VIP: ").concat(cliente.isEsVIP()));
});
// 3. Modificar un Cliente
// console.log("Modificando el teléfono de Juan...");
// veterinaria1.modificarCliente("1", { telefono: 111222333 });
// console.log("Clientes después de modificar:", redVeterinarias);
// 4. Eliminar un Cliente
console.log("Eliminando el cliente Juan...");
veterinaria1.eliminarCliente("1");
console.log("Clientes después de eliminar:", veterinaria1);
// 5. Agregar Pacientes
console.log("Agregando pacientes...");
veterinaria1.agregarPaciente(new Paciente_1.Paciente("1", "Fido", "Perro", "2"));
veterinaria1.agregarPaciente(new Paciente_1.Paciente("2", "Miau", "Gato", "2"));
console.log("Pacientes después de agregar:", veterinaria1);
// 6. Agregar Proveedores
console.log("Agregando proveedores...");
redVeterinarias.agregarProveedor(new Proveedor_1.Proveedor("1", "Proveedor A", "contacto@proveedora.com"));
redVeterinarias.agregarProveedor(new Proveedor_1.Proveedor("2", "Proveedor B", "contacto@proveedorb.com"));
console.log("Proveedores después de agregar:", redVeterinarias);
//Tablas
console.table(veterinaria1.obtenerClientes());
var gestor = new GestorPrograma_1.GestorPrograma("Gestor");
gestor.opcionesGestorVeterinarias();
