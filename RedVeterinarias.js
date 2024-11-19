"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedVeterinarias = void 0;
var RedVeterinarias = /** @class */ (function () {
    function RedVeterinarias() {
        this.veterinarias = [];
        this.proveedores = [];
        //    getProveedores() //ToDo implementar
        //   modificarProveedor() //ToDo implementar.
        //   eliminarProveedor() //ToDo implementar.
    }
    // METODOS VETERINARIA //
    RedVeterinarias.prototype.agregarVeterinaria = function (veterinaria) {
        this.veterinarias.push(veterinaria);
    };
    //getVeterinarias() //ToDo implementar
    RedVeterinarias.prototype.getVeterinarias = function () {
        return __spreadArray([], this.veterinarias, true);
    };
    //modificarVeterinaria() //ToDo implementar.
    RedVeterinarias.prototype.modificarVeterinaria = function (nombre, datosActualizados) {
        // Busca la veterinaria por nombre
        var veterinaria = this.veterinarias.find(function (vet) { return vet.getNombre() === nombre; });
        if (veterinaria) {
            // Actualiza las propiedades existentes de la veterinaria
            Object.assign(veterinaria, datosActualizados);
            return true; // Modificación exitosa
        }
        return false; // No se encontró la veterinaria
    };
    RedVeterinarias.prototype.eliminarVeterinaria = function (id) {
        this.veterinarias = this.veterinarias.filter(function (vet) { return vet.getId() !== id; });
    };
    //METODOS PROVEEDOR //
    RedVeterinarias.prototype.agregarProveedor = function (proveedor) {
        this.proveedores.push(proveedor);
    };
    return RedVeterinarias;
}());
exports.RedVeterinarias = RedVeterinarias;
