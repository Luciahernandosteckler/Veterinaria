import * as rls from 'readline-sync';
import {Paciente} from "./Paciente";
import {GestorPrograma} from "./GestorPrograma";

export class Cliente {
  private id: string;
  private nombre: string;
  private telefono: number;
  private dni : number;
  private listaMascotas : Paciente[] = []
  private numeroVisitas: number = 0;
  private esVIP: boolean = false;
  
  constructor(nombre: string, telefono: number, dni:number) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.dni = dni;
    this.id = Cliente.incrementarId();
  }
  
  static idActual = 0;
  
  static incrementarId(): string {
    return (++this.idActual).toString();
  }

  //METODOS

  incrementarVisitas() {
    this.numeroVisitas++;
    this.esVIP = this.numeroVisitas >= 5;
  }

  //GETTERS Y SETTERS

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getDni(): number {
    return this.dni;
  }

  public setDni(dni: number): void {
    this.dni = dni;
  }

  public getMascotas():Paciente[]{
    return this.listaMascotas;
  }

  public setMascotas(listaMascotas:Paciente[]){
    this.listaMascotas=(listaMascotas);
  }

  public getTelefono(): number {
    return this.telefono;
  }

  public setTelefono(telefono: number): void {
    this.telefono = telefono;
  }

  public getNumeroVisitas(): number {
    return this.numeroVisitas;
  }

  public setNumeroVisitas(numeroVisitas: number): void {
    this.numeroVisitas = numeroVisitas;
  }

  public isEsVIP(): boolean {
    return this.esVIP;
  }

  public setEsVIP(esVIP: boolean): void {
    this.esVIP = esVIP;
  }

  // METODOS MASCOTAS //

  public agregarMascotaALaLista(mascota: Paciente): void {
    this.listaMascotas.push(mascota);
  }

  public mostrarListaMascotas(){
    console.log("Lista de Mascotas:");
      this.listaMascotas.forEach((mascota, index) => {
        console.log(`${index + 1}. Nombre: ${mascota.getNombre()}, Tipo: ${mascota.getEspecie()}`);
      });
  }

  //CRUD MASCOTAS

  public crearMascota(): void {
    console.clear();
        // Crear mascota
        const nombre : string = rls.question("Ingrese el nombre de la Mascota: ");
        const especie : string = rls.question("Ingrese la especie de su mascota: ");
        const mascota = new Paciente(nombre, especie, this.id);

        // Asignar mascota al cliente
        this.agregarMascotaALaLista(mascota);
        console.log(`Mascota ${mascota.getNombre()} agregado exitosamente al ${this.constructor.name}: ${this.nombre}`);
        GestorPrograma.esperarEnter();
    console.clear();
}

public listarMascotas(): void {
  // Validar si tiene  mascotas
  if (this.listaMascotas.length === 0) {
      console.log(`No hay Mascotas registradas al cliente: ${this.nombre}.`);
      if (rls.keyInYNStrict(`¿Desea crear una nueva Mascota?`)) {
          // Ejecuta nuevamente el Metodo crearMascota si se selecciona 'Sí'
          this.crearMascota();
      } else {
          return; // Salir porque no hay nada que listar
      }
  }

  // Listar clientes
  console.log(`Mascotas registradas al cliente: ${this.nombre}`);
  this.mostrarListaMascotas();

  // Esperar la interacción del usuario
  GestorPrograma.esperarEnter();
  console.clear();
}

public modificarMascota(): void {
    let modificarOtro = true;
    while (modificarOtro) {
        this.listarMascotas();
        let id: number = rls.questionInt("Ingrese el numero de Mascota que desee modificar: ") - 1;
        if (id < 0 || id >= this.listaMascotas.length) {
            console.log("Número inválido");
            GestorPrograma.esperarEnter();
        } else {
            let mascota: Paciente = this.listaMascotas[id];
            console.log(`Mascota: ${mascota.getNombre()} Especie: ${mascota.getEspecie()}`);
            let nuevoNombre: string = rls.question("Ingrese nuevo nombre (o presione Enter para no modificar): ");
            let nuevaEspecie: string = rls.question("Ingrese nuevo telefono (o presione 0 para no modificar): ");
            if (nuevoNombre) {
                mascota.setNombre(nuevoNombre);
                console.log("Nombre Modificado Correctamente");
            }
            if (nuevaEspecie) {
                mascota.setEspecie(nuevaEspecie);
                console.log("Especie modificada correctamente");
            }

            modificarOtro = rls.keyInYNStrict(`¿Desea modificar otro cliente?`);
        }
    }
    console.clear();
}

public eliminarMascota(): void {
  let eliminarOtro = true;
  while (eliminarOtro) {
      this.listarMascotas();
      let id: number = rls.questionInt("Ingrese el numero de la Mascota que desee eliminar: ") - 1;
      if (id < 0 || id >= this.listaMascotas.length) {
          console.log("Número inválido");
          GestorPrograma.esperarEnter();
      } else {
          let mascota: Paciente = this.listaMascotas[id];
          console.log(`Mascota: ${mascota.getNombre()} Especie: ${mascota.getEspecie()}`);
          if (rls.keyInYNStrict(`¿Está seguro que desea eliminar la mascota ${mascota.getNombre()}?`)) {
              this.listaMascotas = this.listaMascotas.filter(m => m !== mascota);
              console.log(`${mascota.getNombre()} eliminado con éxito.`);
              GestorPrograma.esperarEnter();
          } else {
              console.log("Eliminación cancelada.");
              GestorPrograma.esperarEnter();
          }
      }

      eliminarOtro = rls.keyInYNStrict(`¿Desea eliminar otra mascota?`);
  }
  console.clear();
}

}
