import { Cliente } from "./Clientes";
import { Paciente } from "./Paciente";

export class Veterinaria {
  private id: string;
  private nombre: string;
  private direccion: string;
  private clientes: Cliente[] = [];
  private pacientes: Paciente[] = [];

  constructor(id: string, nombre: string, direccion: string) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
  }

   // METODOS CLIENTE //
   
   obtenerClientes(): Cliente[] {
    return this.clientes;
  }

  agregarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  modificarCliente(id: string, nuevosDatos: Partial<Cliente>): void {
    const cliente = this.clientes.find((cli) => cli.getId() === id);
    if (cliente) {
      Object.assign(cliente, nuevosDatos);
    }
  }

  eliminarCliente(id: string): void {
    this.clientes = this.clientes.filter((cli) => cli.getId() !== id);
  }


  // METODOS PACIENTE //

  agregarPaciente(paciente: Paciente): void {
    const idPaciente = paciente.getId();
    const existe = this.pacientes.some((pac) => pac.getId() === idPaciente);
    if (!existe) {
      this.pacientes.push(paciente);
    } else {
      console.log(`El paciente ${paciente.getNombre()} ya existe.`);
    }
  }

  // METODOS PACIENTE //

  // Eliminar un paciente
  eliminarPaciente(id: string): void {
    // Filtrar los pacientes para excluir el paciente con el ID proporcionado
    this.pacientes = this.pacientes.filter((pac) => pac.getId() !== id);
    console.log(`Paciente con ID: ${id} ha sido eliminado.`);
  }

  // Modificar un paciente
  modificarPaciente(id: string, pacienteNuevo: Paciente): void {
    // Buscar el paciente existente usando el ID
    let paciente = this.pacientes.find((pac) => pac.getId() === id);
    
    if (paciente) {
      // Reemplazar el paciente viejo con el nuevo
      const index = this.pacientes.indexOf(paciente);
      if (index !== -1) {
        this.pacientes[index] = pacienteNuevo;
        console.log(`Paciente con ID: ${id} ha sido modificado.`);
      }
    } else {
      console.log(`No se encontró el paciente con ID: ${id}.`);
    }
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

  public getDireccion(): string {
    return this.direccion;
  }

  public setDireccion(direccion: string): void {
    this.direccion = direccion;
  }
}
