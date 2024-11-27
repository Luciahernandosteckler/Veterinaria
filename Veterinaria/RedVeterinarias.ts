import * as rls from 'readline-sync';
import { Veterinaria } from "./Veterinaria";
import { GestorPrograma } from "./GestorPrograma";

export class RedVeterinarias {
  private nombre: string;
  private listaVeterinarias: Veterinaria[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.listaVeterinarias = [];
  }
  // GETTERS Y SETTERS
  public setNombre(nombre: string) {
    this.nombre = nombre;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setVeterinarias(listaVeterinarias: Veterinaria[]) {
    this.listaVeterinarias = listaVeterinarias;
  }

  public getVeterinarias(): Veterinaria[] {
    return this.listaVeterinarias;
  }

  // METODOS VETERINARIA //

  //Agrega una Veterinaria a la Lista
  public agregarVeterinariaALaLista(veterinaria: Veterinaria): void {
    this.listaVeterinarias.push(veterinaria);
  }

  //CRUD Veterinarias

  //CREAR NUEVA VETERINARIA
  public crearVeterinaria() {
    console.log("Ingrese los Datos para La nueva Veterinaria");
    console.log("-------------------------------------------");
    let nombre: string = rls.question("Ingrese el nombre de la Veterinaria: ");
    console.log("Ingrese Direccion de la Veterinaria: ");
    let calle: string = rls.question("Calle: ");
    let numero: number = rls.questionInt("Numero: ");
    let direccion: string = `${calle} : ${numero}`;
    const veterinaria = new Veterinaria(nombre, direccion);
    this.agregarVeterinariaALaLista(veterinaria);
    console.log(`Veterinaria: ${veterinaria.getNombre()}, Agregada Exitosamente`);
    GestorPrograma.esperarEnter();
    console.clear();
 
  }

  //LISTAR VETERINARIAS
  public listarVeterinarias() {
    console.clear();
    if (this.listaVeterinarias.length === 0) {
      console.log("No hay veterinarias registradas.");
    } else {
      console.log("Lista de Veterinarias");
      this.listaVeterinarias.forEach((vet, index) => {
        console.log(`${index + 1}. Veterinaria: ${vet.getNombre()} Direccion - ${vet.getDireccion()}`);
      });
    }
    GestorPrograma.esperarEnter();
    console.clear();
  }
  
  //MODIFICAR VETERINARIAS
  public modificarVeterinaria() {
    this.listarVeterinarias();
    let id: number = rls.questionInt("Ingrese el numero de la Veterinaria que desee modificar: ") - 1;
    if (id < 0 || id > this.listaVeterinarias.length - 1) {
      console.log("Numero Invalido")
      GestorPrograma.esperarEnter();
    } else {
      let veterinaria: Veterinaria = this.listaVeterinarias[id];
      console.log(`Veterinaria: ${veterinaria.getNombre()} Direccion: ${veterinaria.getDireccion()}`)
      let nuevoNombre: string = rls.question("Ingrese nuevo nombre (o presione Enter para no modificar): ");
      let nuevaCalle: string = rls.question("Ingrese nueva calle (o presione Enter para no modificar): ");
      let nuevaNumeracion: number = rls.questionInt("Ingrese nueva numeracion (o ingrese 0 para no modificar): ");

      if (nuevoNombre) {
        veterinaria.setNombre(nuevoNombre);
        console.log("Nombre Modificado Correctamente")
      }
      if (nuevaCalle || nuevaNumeracion != 0) {
        veterinaria.setDireccion(`${nuevaCalle} ${nuevaNumeracion}`)
        console.log("Direccion modificada correctamente ")
      };
      if (rls.keyInYNStrict(`Desea modificar otra: ${veterinaria.constructor.name}`)) {
        //Ejecuta nuevamente el Metodo modificarVeterinaria si se presiona la letra y
        this.modificarVeterinaria();
      } else {
        console.clear();
      }
    }
  }

  //ELIMINAR VETERINARIAS
  public eliminarVeterinaria() {
    this.listarVeterinarias();
    let id: number = rls.questionInt("Ingrese el numero de la Veterinaria que desee eliminar: ") - 1;
    if (id < 0 || id > this.listaVeterinarias.length - 1) {
      console.log("Numero Invalido")
      GestorPrograma.esperarEnter();
    } else {
      let veterinaria: Veterinaria = this.listaVeterinarias[id];
      console.log(`Veterinaria: ${veterinaria.getNombre()} Direccion: ${veterinaria.getDireccion()}`)
      let opcionSeleccionada: number;
      if (rls.keyInYNStrict(`Esta seguro que desea eliminar la ${veterinaria.constructor.name}`)) {
        // Elimina la veterinaria de la lista si se presiona la letra y
        this.listaVeterinarias = this.listaVeterinarias.filter(v => v !== veterinaria);
        console.log(`${veterinaria.constructor.name} eliminado con éxito.`);
        GestorPrograma.esperarEnter();
        console.clear();
      } else {
        console.log("Eliminación cancelada.");
        GestorPrograma.esperarEnter();
        console.clear();
      }
      if (rls.keyInYNStrict(`Desea eliminar otra: ${veterinaria.constructor.name}`)) {
        //Ejecuta nuevamente el Metodo eliminarVeterinaria 
        this.eliminarVeterinaria();
      } else {
        console.clear();
      }
    }
  }
}
