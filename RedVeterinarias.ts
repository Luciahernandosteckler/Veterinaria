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

  modificarVeterinaria(nombre: string, datosActualizados: Partial<Veterinaria>): boolean {
    // Busca la veterinaria por nombre
  
    const veterinaria = this.veterinarias.find(vet => vet.getNombre() === nombre);

    if (veterinaria) {
      // Actualiza las propiedades existentes de la veterinaria
      Object.assign(veterinaria, datosActualizados);
      return true; // Modificación exitosa
    }

    return false; // No se encontró la veterinaria
  }
  

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
