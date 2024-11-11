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
    //modificarVeterinaria() //ToDo implementar.
    eliminarVeterinaria(id) {
        this.veterinarias = this.veterinarias.filter((vet) => vet.getId() !== id);
    }
    //METODOS PROVEEDOR //
    agregarProveedor(proveedor) {
        this.proveedores.push(proveedor);
    }
}
exports.RedVeterinarias = RedVeterinarias;
