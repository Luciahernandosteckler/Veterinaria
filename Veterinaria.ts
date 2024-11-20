import { Cliente } from "./Clientes";
import { Paciente } from "./Paciente";
import { Proveedor } from "./Proveedor";

export class Veterinaria {
  private id: string;
  private nombre: string;
  private direccion: string;
  private listaClientes: Cliente[] = [];
  private listaPacientes:Paciente[] = [];
  private listaProveedores : Proveedor[] = [];

  constructor(nombre: string, direccion: string) {
    this.id = Veterinaria.incrementarId();
    this.nombre = nombre;
    this.direccion = direccion;
  }

  static idActual = 0;
  
  static incrementarId(): string {
    return (++this.idActual).toString();
  }

   // METODOS CLIENTE //
   
   obtenerClientes(): Cliente[] {
    return this.listaClientes;
  }

  agregarCliente(cliente: Cliente): void {
    this.listaClientes.push(cliente);
  }

  modificarCliente(id: string, clienteNuevo:Cliente):void{
    //Buscamos el cliente que corresponda al id ingresado por parametro.
    let cliente = this.listaClientes.find((cli) => cli.getId() === id);

    //Se reemplaza el antiguo cliente por el nuevo cliente ingresado por parametro
    cliente = clienteNuevo;
  }

  eliminarCliente(id: string): void {
    this.listaClientes = this.listaClientes.filter((cli) => cli.getId() !== id);
  }


  // METODOS PACIENTE //

  agregarPaciente(paciente: Paciente): void {
    const idPaciente = paciente.getId();
    const existe = this.listaPacientes.some((pac) => pac.getId() === idPaciente);
    if (!existe) {
      this.listaPacientes.push(paciente);
    } else {
      console.log(`El paciente ${paciente.getNombre()} ya existe.`);
    }
  }

  // eliminarPaciente(paciente: Paciente): void{}; //ToDo implementar.
  // modificarPaciente(paciente: Paciente): void{}; //ToDo implementar

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

  public setProveedor(proveedor : Proveedor):void{
    this.listaProveedores.push(proveedor);
  }
  public getProveedor():Proveedor[]{
    return this.listaProveedores;
  }

  public setCliente(cliente : Cliente):void{
    this.listaClientes.push(cliente);
  }
  public getCliente():Cliente[]{
    return this.listaClientes;
  }
}
