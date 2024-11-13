import { Cliente } from "./Clientes";
import { Paciente } from "./Paciente";
import { Proveedor } from "./Proveedor";
import { Veterinaria } from "./Veterinaria";

export class RedVeterinarias {
  private veterinarias: Veterinaria[] = [];
  private proveedores: Proveedor[] = [];

 
  // METODOS VETERINARIA //

  agregarVeterinaria(veterinaria: Veterinaria): void {
    this.veterinarias.push(veterinaria);
  }

  //getVeterinarias() //ToDo implementar

  getVeterinarias(): Veterinaria[] {
    return [...this.veterinarias];
  }
  
  //modificarVeterinaria() //ToDo implementar.

  eliminarVeterinaria(id: string): void {
    this.veterinarias = this.veterinarias.filter((vet) => vet.getId() !== id);
  }

 

  //METODOS PROVEEDOR //

  agregarProveedor(proveedor: Proveedor): void {
    this.proveedores.push(proveedor);
  }

  //    getProveedores() //ToDo implementar
  //   modificarProveedor() //ToDo implementar.
  //   eliminarProveedor() //ToDo implementar.
}
