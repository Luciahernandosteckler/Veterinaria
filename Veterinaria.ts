import * as rls from 'readline-sync';
import { Cliente } from "./Clientes";
import { Proveedor } from "./Proveedor";
import { GestorPrograma } from "./GestorPrograma";

export class Veterinaria {
  private id: string;
  private nombre: string;
  private direccion: string;
  private listaClientes: Cliente[] = [];
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

  public setListaProveedores(listaProveedores : Proveedor[]):void{
    this.listaProveedores = listaProveedores;
  }
  public getListaProveedores():Proveedor[]{
    return this.listaProveedores;
  }

  public setListaClientes(listaClientes : Cliente[]):void{
    this.listaClientes= listaClientes;
  }
  public getlistaClientes():Cliente[]{
    return this.listaClientes;
  }

  // METODOS CLIENTE //

  public agregarClienteALaLista(cliente: Cliente): void {
    this.listaClientes.push(cliente);
  }

  public mostrarListaClientes(){
    console.log("Lista de clientes:");
      this.listaClientes.forEach((cliente, index) => {
        console.log(`${index + 1}. Nombre: ${cliente.getNombre()}, Dni: ${cliente.getDni()}`);
      });
  }

  //CRUD Clientes

  public crearCliente(): void {
    console.clear();
        // Crear cliente
        const nombre : string = rls.question("Ingrese el nombre del Cliente: ");
        const telefono : number = rls.questionInt("Ingrese el número telefónico del Cliente: ");
        const dni: number = rls.questionInt("Ingrese el DNI del Cliente: ");
        const cliente = new Cliente(nombre, telefono, dni);

        // Asignar cliente a la veterinaria
        this.agregarClienteALaLista(cliente);
        console.log(`Cliente ${cliente.getNombre()} agregado exitosamente a la ${this.constructor.name}: ${this.nombre}`);
        GestorPrograma.esperarEnter();
    console.clear();
}

public listarClientes(): void {
  // Validar si hay clientes asociados
  if (this.listaClientes.length === 0) {
      console.log(`No hay clientes registrados en la veterinaria: ${this.nombre}.`);
      if (rls.keyInYNStrict(`¿Desea crear un nuevo cliente?`)) {
          // Ejecuta nuevamente el Metodo crearCliente si se selecciona 'Sí'
          this.crearCliente();
      } else {
          return; // Salir porque no hay nada que listar
      }
  }

  // Listar clientes
  console.log(`Clientes registrados en la veterinaria: ${this.nombre}`);
  this.mostrarListaClientes();

  // Esperar la interacción del usuario
  GestorPrograma.esperarEnter();
  console.clear();
}

public modificarCliente(): void {
    let modificarOtro = true;
    while (modificarOtro) {
        this.listarClientes();
        let id: number = rls.questionInt("Ingrese el numero del Cliente que desee modificar: ") - 1;
        if (id < 0 || id >= this.listaClientes.length) {
            console.log("Número inválido");
            GestorPrograma.esperarEnter();
        } else {
            let cliente: Cliente = this.listaClientes[id];
            console.log(`Cliente: ${cliente.getNombre()} Dni: ${cliente.getDni()}`);
            let nuevoNombre: string = rls.question("Ingrese nuevo nombre (o presione Enter para no modificar): ");
            let nuevoTelefono: number = rls.questionInt("Ingrese nuevo telefono (o presione 0 para no modificar): ");
            let nuevoDni: number = rls.questionInt("Ingrese nuevo dni (o ingrese 0 para no modificar): ");

            if (nuevoNombre) {
                cliente.setNombre(nuevoNombre);
                console.log("Nombre Modificado Correctamente");
            }
            if (nuevoTelefono != 0) {
                cliente.setTelefono(nuevoTelefono);
                console.log("Teléfono modificado correctamente");
            }
            if (nuevoDni != 0) {
                cliente.setDni(nuevoDni);
                console.log("DNI modificado correctamente");
            }

            modificarOtro = rls.keyInYNStrict(`¿Desea modificar otro cliente?`);
        }
    }
    console.clear();
}

public eliminarCliente(): void {
  let eliminarOtro = true;
  while (eliminarOtro) {
      this.listarClientes();
      let id: number = rls.questionInt("Ingrese el numero del Cliente que desee eliminar: ") - 1;
      if (id < 0 || id >= this.listaClientes.length) {
          console.log("Número inválido");
          GestorPrograma.esperarEnter();
      } else {
          let cliente: Cliente = this.listaClientes[id];
          console.log(`Cliente: ${cliente.getNombre()} Dni: ${cliente.getDni()}`);
          if (rls.keyInYNStrict(`¿Está seguro que desea eliminar el cliente ${cliente.getNombre()}?`)) {
              this.listaClientes = this.listaClientes.filter(c => c !== cliente);
              console.log(`${cliente.getNombre()} eliminado con éxito.`);
              GestorPrograma.esperarEnter();
          } else {
              console.log("Eliminación cancelada.");
              GestorPrograma.esperarEnter();
          }
      }

      eliminarOtro = rls.keyInYNStrict(`¿Desea eliminar otro cliente?`);
  }
  console.clear();
}

  // METODOS PROVEEDORES //
  public agregarProveedorALaLista(proveedor: Proveedor): void {
    this.listaProveedores.push(proveedor);
  }

  public mostrarListaProveedores(){
    console.log("Lista de proveedores:");
      this.listaProveedores.forEach((proveedor, index) => {
        console.log(`${index + 1}. Nombre: ${proveedor.getNombre()}, Contacto: ${proveedor.getContacto()}`);
      });
  }
  
  //CRUD Proveedores

  public crearProveedor(): void {
    console.clear();
    let agregarOtro = true;
    while (agregarOtro) {
        // Crear proveedor
        const nombre: string = rls.question("Ingrese el nombre del Proveedor: ");
        const contacto: string = rls.question("Ingrese el contacto del Proveedor: ");
        const tipo : string = rls.question("Ingrese una descripcion de lo que tiene el proveedor: ");
        const proveedor = new Proveedor(nombre, contacto, tipo);

        // Asignar proveedor a la veterinaria
        this.agregarProveedorALaLista(proveedor);
        console.log(`Proveedor ${proveedor.getNombre()} agregado exitosamente a la ${this.constructor.name}: ${this.nombre}`);

        // Preguntar si desea agregar otro proveedor
        agregarOtro = rls.keyInYNStrict(`Desea agregar otro proveedor?`);
    }
    console.clear();
}

public listarProveedores(): void {
  // Validar si hay clientes asociados
  if (this.listaProveedores.length === 0) {
      console.log(`No hay proveedores registrados en la ${this.constructor.name}: ${this.nombre}.`);
      if (rls.keyInYNStrict(`¿Desea crear un nuevo proveedor?`)) {
          // Ejecuta nuevamente el Metodo crearCliente si se selecciona 'Sí'
          this.crearProveedor();
      } else {
          return; // Salir porque no hay nada que listar
      }
  }

  // Listar proveedores
  console.log(`Proveedores registrados en la veterinaria: ${this.nombre}`);
  this.mostrarListaProveedores();

  // Esperar la interacción del usuario
  GestorPrograma.esperarEnter();
  console.clear();
}

public modificarProveedor(): void {
    let modificarOtro = true;
    while (modificarOtro) {
        this.listarProveedores();
        let id: number = rls.questionInt("Ingrese el numero del Proveedor que desee modificar: ") - 1;
        if (id < 0 || id >= this.listaProveedores.length) {
            console.log("Número inválido");
            GestorPrograma.esperarEnter();
        } else {
            let proveedor: Proveedor = this.listaProveedores[id];
            console.log(`Proveedor: ${proveedor.getNombre()} contacto: ${proveedor.getContacto()}, tipo ${proveedor.getTipo()}`);
            let nuevoNombre: string = rls.question("Ingrese nuevo nombre (o presione Enter para no modificar): ");
            let nuevoContacto: string = rls.question("Ingrese nuevo contacto (o presione Enter para no modificar): ");
            let nuevoTipo: string = rls.question("Ingrese nuevo tipo (o ingrese Enter para no modificar): ");

            if (nuevoNombre) {
                proveedor.setNombre(nuevoNombre);
                console.log("Nombre Modificado Correctamente");
            }
            if (nuevoContacto) {
                proveedor.setContacto(nuevoContacto);
                console.log("Contacto modificado correctamente");
            }
            if (nuevoTipo) {
                proveedor.setTipo(nuevoTipo);
                console.log("Tipo modificado correctamente");
            }

            modificarOtro = rls.keyInYNStrict(`¿Desea modificar otro proveedor?`);
        }
    }
    console.clear();
}

public eliminarProveedor(): void {
  let eliminarOtro = true;
  while (eliminarOtro) {
      this.listarProveedores();
      let id: number = rls.questionInt("Ingrese el numero del Proveedor que desee eliminar: ") - 1;
      if (id < 0 || id >= this.listaProveedores.length) {
          console.log("Número inválido");
          GestorPrograma.esperarEnter();
      } else {
          let proveedor: Proveedor = this.listaProveedores[id];
          console.log(`Proveedor: ${proveedor.getNombre()} contacto: ${proveedor.getContacto()}, tipo ${proveedor.getTipo()}`);
          if (rls.keyInYNStrict(`¿Está seguro que desea eliminar el proveedor ${proveedor.getNombre()}?`)) {
              this.listaProveedores = this.listaProveedores.filter(p => p !== proveedor);
              console.log(`${proveedor.getNombre()} eliminado con éxito.`);
              GestorPrograma.esperarEnter();
          } else {
              console.log("Eliminación cancelada.");
              GestorPrograma.esperarEnter();
          }
      }

      eliminarOtro = rls.keyInYNStrict(`¿Desea eliminar otro proveedor?`);
  }
  console.clear();
}
}
