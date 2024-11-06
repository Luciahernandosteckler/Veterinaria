"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clientes_1 = require("./Clientes");
const Paciente_1 = require("./Paciente");
const Proveedor_1 = require("./Proveedor");
const Veterinaria_1 = require("./Veterinaria");
const RedVeterinarias_1 = require("./RedVeterinarias");
// Crear instancia de la red de veterinarias
const redVeterinarias = new RedVeterinarias_1.RedVeterinarias();
// Crear instancia de veterinarias
const veterinaria1 = new Veterinaria_1.Veterinaria("1", "Veterinaria A", "Calle 123");
// 1. Agregar Veterinarias
console.log("Agregando veterinarias...");
redVeterinarias.agregarVeterinaria(veterinaria1);
console.log("Veterinarias después de agregar:", redVeterinarias);
// 2. Agregar Clientes a las veterinarias.
console.log("Agregando clientes...");
veterinaria1.agregarCliente(new Clientes_1.Cliente("1", "Juan", 123456789));
veterinaria1.agregarCliente(new Clientes_1.Cliente("2", "María", 987654321));
veterinaria1.agregarCliente(new Clientes_1.Cliente("3", "Pedro", 555123456));
veterinaria1.agregarCliente(new Clientes_1.Cliente("4", "Luisa", 444987654));
console.log("Clientes en veterinaria 1 después de agregar:", veterinaria1.obtenerClientes());
// Mostrar si los clientes de cierta veterinaria son VIP
console.log("Estado VIP de los clientes de veterinaria 1:");
veterinaria1.obtenerClientes().forEach(cliente => {
    console.log(`${cliente.getNombre()} es VIP: ${cliente.isEsVIP()}`);
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
