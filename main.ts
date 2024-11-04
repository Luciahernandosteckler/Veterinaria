// main.ts

import { RedVeterinarias, Veterinaria, Cliente, Paciente, Proveedor } from './RedVeterinarias';

// Crear instancia de la red de veterinarias
const redVeterinarias = new RedVeterinarias();

// 1. Agregar Veterinarias
console.log("Agregando veterinarias...");
redVeterinarias.agregarVeterinaria(new Veterinaria("1", "Veterinaria A", "Calle 123"));
redVeterinarias.agregarVeterinaria(new Veterinaria("2", "Veterinaria B", "Calle 456"));
console.log("Veterinarias después de agregar:", redVeterinarias);

// 2. Agregar Clientes
console.log("Agregando clientes...");
redVeterinarias.agregarCliente(new Cliente("1", "Juan", "123456789"));
redVeterinarias.agregarCliente(new Cliente("2", "María", "987654321"));
redVeterinarias.agregarCliente(new Cliente("3", "Pedro", "555123456")); 
redVeterinarias.agregarCliente(new Cliente("4", "Luisa", "444987654")); 
console.log("Clientes después de agregar:", redVeterinarias.obtenerClientes());

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
redVeterinarias.eliminarCliente("1"); 
console.log("Clientes después de eliminar:", redVeterinarias);

// 5. Agregar Pacientes
console.log("Agregando pacientes...");
redVeterinarias.agregarPaciente(new Paciente("1", "Fido", "Perro", "2"));
redVeterinarias.agregarPaciente(new Paciente("2", "Miau", "Gato", "2"));
console.log("Pacientes después de agregar:", redVeterinarias);

// 6. Agregar Proveedores
console.log("Agregando proveedores...");
redVeterinarias.agregarProveedor(new Proveedor("1", "Proveedor A", "contacto@proveedora.com"));
redVeterinarias.agregarProveedor(new Proveedor("2", "Proveedor B", "contacto@proveedorb.com"));
console.log("Proveedores después de agregar:", redVeterinarias);

//Tablas

console.table(redVeterinarias.obtenerClientes());

