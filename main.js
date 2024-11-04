"use strict";
// main.ts
Object.defineProperty(exports, "__esModule", { value: true });
const RedVeterinarias_1 = require("./RedVeterinarias");
// Crear instancia de la red de veterinarias
const redVeterinarias = new RedVeterinarias_1.RedVeterinarias();
// 1. Agregar Veterinarias
console.log("Agregando veterinarias...");
redVeterinarias.agregarVeterinaria(new RedVeterinarias_1.Veterinaria("1", "Veterinaria A", "Calle 123"));
redVeterinarias.agregarVeterinaria(new RedVeterinarias_1.Veterinaria("2", "Veterinaria B", "Calle 456"));
console.log("Veterinarias después de agregar:", redVeterinarias);
// 2. Agregar Clientes
console.log("Agregando clientes...");
redVeterinarias.agregarCliente(new RedVeterinarias_1.Cliente("1", "Juan", "123456789"));
redVeterinarias.agregarCliente(new RedVeterinarias_1.Cliente("2", "María", "987654321"));
console.log("Clientes después de agregar:", redVeterinarias);
// Mostrar si los clientes son VIP
console.log("Estado VIP de los clientes:");
redVeterinarias.obtenerClientes().forEach(cliente => {
    console.log(`${cliente.nombre} es VIP: ${cliente.esVip}`);
});
// 3. Modificar un Cliente
console.log("Modificando el teléfono de Juan...");
redVeterinarias.modificarCliente("1", { telefono: "111222333" });
console.log("Clientes después de modificar:", redVeterinarias);
// 4. Eliminar un Cliente
console.log("Eliminando el cliente Juan...");
redVeterinarias.eliminarCliente("1"); // Cambiado a eliminarCliente
console.log("Clientes después de eliminar:", redVeterinarias);
// 5. Agregar Pacientes
console.log("Agregando pacientes...");
redVeterinarias.agregarPaciente(new RedVeterinarias_1.Paciente("1", "Fido", "Perro", "2"));
redVeterinarias.agregarPaciente(new RedVeterinarias_1.Paciente("2", "Miau", "Gato", "2"));
console.log("Pacientes después de agregar:", redVeterinarias);
// 6. Agregar Proveedores
console.log("Agregando proveedores...");
redVeterinarias.agregarProveedor(new RedVeterinarias_1.Proveedor("1", "Proveedor A", "contacto@proveedora.com"));
redVeterinarias.agregarProveedor(new RedVeterinarias_1.Proveedor("2", "Proveedor B", "contacto@proveedorb.com"));
console.log("Proveedores después de agregar:", redVeterinarias);
