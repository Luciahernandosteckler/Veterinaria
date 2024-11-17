"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedVeterinarias = void 0;
class RedVeterinarias {
    constructor() {
        this.veterinarias = [];
        this.proveedores = [];
        //    getProveedores() //ToDo implementar
        //   modificarProveedor() //ToDo implementar.
        //   eliminarProveedor() //ToDo implementar.
    }
    // METODOS VETERINARIA //
    agregarVeterinaria(veterinaria) {
        this.veterinarias.push(veterinaria);
    }
    //getVeterinarias() //ToDo implementar
    getVeterinarias() {
        return [...this.veterinarias];
    }
    //modificarVeterinaria() //ToDo implementar.
    modificarVeterinaria(nombre, datosActualizados) {
        // Busca la veterinaria por nombre
        const veterinaria = this.veterinarias.find(vet => vet.getNombre() === nombre);
        if (veterinaria) {
            // Actualiza las propiedades existentes de la veterinaria
            Object.assign(veterinaria, datosActualizados);
            return true; // Modificación exitosa
        }
        return false; // No se encontró la veterinaria
    }
    eliminarVeterinaria(id) {
        this.veterinarias = this.veterinarias.filter((vet) => vet.getId() !== id);
    }
    //METODOS PROVEEDOR //
    agregarProveedor(proveedor) {
        this.proveedores.push(proveedor);
    }
}
exports.RedVeterinarias = RedVeterinarias;
