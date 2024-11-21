import * as rls from 'readline-sync';
import {Cliente} from "./Clientes";
import {Paciente} from "./Paciente";
import {Proveedor} from "./Proveedor";
import {RedVeterinarias} from "./RedVeterinarias";
import {Veterinaria} from "./Veterinaria";


export class GestorPrograma{
    private nombre :string;
    private redVeterinarias : RedVeterinarias; 
    private listaClientes : Cliente[]=[];
    private listaVeterinarias : Veterinaria[]=[];

    constructor(nombre:string){
        this.nombre=nombre;
        this.redVeterinarias = new RedVeterinarias("Gestor");
    }

   // GETTERS Y SETTERS
   public setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public getNombre(): string {
        return this.nombre;
    }
    
    //Menu principal identificacion (Administrador o Cliente).
    public opcionesGestorVeterinarias(): void {
        let opcionSeleccionada: number;
        this.mensajeOpciones("Bienvenido al Gestor de Veterinarias");
        do{
            opcionSeleccionada = this.menuOpciones(" 1 - Soy Administrador \n 2 - Soy Cliente\n 3 - Salir");
            switch (opcionSeleccionada) {
                case 1: this.ejecutarComoAdministrador(); break;
                case 2: this.comprobarCliente(); break;
                case 3: console.log("Saliendo..."); break;
                default: console.log("Opción no válida. Por favor, intente nuevamente.");
                GestorPrograma.esperarEnter();
                console.clear();
            }
        } while (opcionSeleccionada !==3);
    }

    //Menu para Administradores.
    private ejecutarComoAdministrador(){
        console.clear();
        let opcionSeleccionada: number;
        this.mensajeOpciones("Bienvenido administrador");
        do{
            opcionSeleccionada = this.menuOpciones(" 1 - Gestor de Veterinarias \n 2 - Gestor de Clientes\n 3 - Gestor de Proovedores\n 4 - Gestor de Pacientes \n 5 - Volver ");
            switch (opcionSeleccionada) {
                case 1: this.gestorVeterinarias(); break;
                case 2: this.gestorClientes(); break;
                case 3: this.gestorProveedores(); break;
                case 4: this.gestorPacientes(); break;
                case 5: console.log("Volviendo...");
                        GestorPrograma.esperarEnter();
                        console.clear();
                        break;
                default: console.log("Opción no válida. Por favor, intente nuevamente.");
                         GestorPrograma.esperarEnter();
                        console.clear();
            }
        } while (opcionSeleccionada !==5);
    };

    //Gestiona los CRUD DE VETERINARIAS.
    private gestorVeterinarias(){
        console.clear()
        let opcionSeleccionada: number;
        this.mensajeOpciones("Aqui podra Crear o Modificar Veterinarias");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nueva Veterinaria \n 2 - Ver Lista de Veterinarias\n 3 - Modificar Veterinaria \n 4 - Eliminar Veterinaria\n 5 - Volver");
            switch (opcionSeleccionada) {
                case 1: this.redVeterinarias.crearVeterinaria(); opcionSeleccionada=5; break;
                case 2: this.redVeterinarias.listarVeterinarias(); opcionSeleccionada=5; break;
                case 3: this.redVeterinarias.modificarVeterinaria(); opcionSeleccionada=5; break;
                case 4: this.redVeterinarias.eliminarVeterinaria();opcionSeleccionada=5; break;
                case 5: console.log("Volviendo...")
                        opcionSeleccionada=5;
                        console.clear(); 
                        break;
                        default: console.log("Opción no válida. Por favor, intente nuevamente.");
                        GestorPrograma.esperarEnter();
                        console.clear();
            }
        } while ( opcionSeleccionada !== 5);
    };

    // Comprueba si hay veterinarias en la Red y permite seleccionar una
private seleccionarVeterinaria(): Veterinaria | null {
    const veterinarias = this.redVeterinarias.getVeterinarias();

    if (veterinarias.length === 0) {
        console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
        this.redVeterinarias.crearVeterinaria();
        //return null; // Salir porque no hay veterinarias
    }

    this.redVeterinarias.listarVeterinarias();
    const id = rls.questionInt("Ingrese el número de la Veterinaria que desea seleccionar: ") - 1;

    if (id < 0 || id >= veterinarias.length) {
        console.log("Número inválido. Regresando al menú principal.");
        GestorPrograma.esperarEnter();
        return null; // Salir porque la selección fue inválida
    }

    const veterinaria = veterinarias[id];
    console.log(`Veterinaria seleccionada: ${veterinaria.getNombre()} (${veterinaria.getDireccion()})`);
    GestorPrograma.esperarEnter();
    return veterinaria;
}

// Método para gestionar clientes
private gestorClientes(): void {
    console.clear();
    const veterinaria = this.seleccionarVeterinaria();

    // Salir si no se seleccionó ninguna veterinaria
    if (veterinaria!=null){
        let opcionSeleccionada: number;
    this.mensajeOpciones("Aquí podrá Crear o Modificar Clientes");
    do {
        opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Cliente \n 2 - Ver Lista de Clientes\n 3 - Modificar Cliente \n 4 - Eliminar Cliente \n 5 - Volver");

        switch (opcionSeleccionada) {
            case 1:
                veterinaria.crearCliente(veterinaria);
                break;
            case 2:
                veterinaria.listarClientes(veterinaria);
                break;
            case 3:
                veterinaria.modificarCliente(veterinaria);
                break;
            case 4:
                veterinaria.eliminarCliente(veterinaria);
                break;
            case 5:
                console.log("Volviendo...");
                console.clear();
                break;
                default: console.log("Opción no válida. Por favor, intente nuevamente.");
                GestorPrograma.esperarEnter();
                console.clear();
        }
    } while (opcionSeleccionada !== 5);
    }

    
}

// Método para gestionar proveedores
private gestorProveedores(): void {
    console.clear();
    const veterinaria = this.seleccionarVeterinaria();

    // Salir si no se seleccionó ninguna veterinaria
    if (!veterinaria) return;

    let opcionSeleccionada: number;
    this.mensajeOpciones("Aquí podrá Crear o Modificar Proveedores");
    do {
        opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Proveedor \n 2 - Ver Lista de Proveedores \n 3 - Modificar Proveedor \n 4 - Eliminar Proveedor \n 5 - Volver");

        switch (opcionSeleccionada) {
            case 1:
                veterinaria.crearProveedor(veterinaria);
                break;
            case 2:
                veterinaria.listarProveedores(veterinaria);
                break;
            case 3:
                veterinaria.modificarProveedor(veterinaria);
                break;
            case 4:
                veterinaria.eliminarProveedor(veterinaria);
                break;
            case 5:
                console.log("Volviendo...");
                console.clear();
                break;
                default: console.log("Opción no válida. Por favor, intente nuevamente.");
                GestorPrograma.esperarEnter();
                console.clear();
        }
    } while (opcionSeleccionada !== 5);
}

    // Método genérico para gestionar veterinarias
private gestionarVeterinaria(
    tipoGestion: "Clientes" | "Proveedores",
    acciones: {
        crear: (veterinaria: Veterinaria) => void;
        listar: (veterinaria: Veterinaria) => void;
        modificar: (veterinaria: Veterinaria) => void;
        eliminar: (veterinaria: Veterinaria) => void;
    }
): void {
    console.clear();
    let veterinaria = this.seleccionarVeterinaria();
    if (veterinaria === null) return; // Salir si no se seleccionó una veterinaria

    let opcionSeleccionada: number;
    this.mensajeOpciones(`Aquí podrá Crear o Modificar ${tipoGestion}`);
    do {
        opcionSeleccionada = this.menuOpciones(` 1 - Crear nuevo ${tipoGestion.slice(0, -1)} \n 2 - Ver Lista de ${tipoGestion} \n 3 - Modificar ${tipoGestion.slice(0, -1)} \n 4 - Eliminar ${tipoGestion.slice(0, -1)} \n 5 - Volver`);

        switch (opcionSeleccionada) {
            case 1:
                acciones.crear(veterinaria);
                break;
            case 2:
                acciones.listar(veterinaria);
                break;
            case 3:
                acciones.modificar(veterinaria);
                break;
            case 4:
                acciones.eliminar(veterinaria);
                break;
            case 5:
                console.log("Volviendo al menú principal...");
                console.clear();
                break;
                default: console.log("Opción no válida. Por favor, intente nuevamente.");
                GestorPrograma.esperarEnter();
                console.clear();
        }
    } while (opcionSeleccionada !== 5);
}

// Métodos específicos para gestionar clientes y proveedores
private gestorClientes3(): void {
    this.gestionarVeterinaria("Clientes", {
        crear: (veterinaria) => veterinaria.crearCliente(veterinaria),
        listar: (veterinaria) => veterinaria.listarClientes(veterinaria),
        modificar: (veterinaria) => veterinaria.modificarCliente(veterinaria),
        eliminar: (veterinaria) => veterinaria.eliminarCliente(veterinaria),
    });
}

private gestorProveedores3(): void {
    this.gestionarVeterinaria("Proveedores", {
        crear: (veterinaria) => veterinaria.crearProveedor(veterinaria),
        listar: (veterinaria) => veterinaria.listarProveedores(veterinaria),
        modificar: (veterinaria) => veterinaria.modificarProveedor(veterinaria),
        eliminar: (veterinaria) => veterinaria.eliminarProveedor(veterinaria),
    });
}

    // Comprueba si hay veterinarias en la Red, de existir una la retorna
private seleccionarVeterinaria2(): Veterinaria | null {
    const veterinarias = this.redVeterinarias.getVeterinarias();

    if (veterinarias.length === 0) {
        console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
        GestorPrograma.esperarEnter();
        return null; // Salir porque no hay veterinarias
    }

    this.redVeterinarias.listarVeterinarias();
    let id = rls.questionInt("Ingrese el número de la Veterinaria que desea seleccionar: ") - 1;

    if (id < 0 || id >= veterinarias.length) {
        console.log("Número inválido. Intente nuevamente.");
        GestorPrograma.esperarEnter();
        return null; // Salir porque la selección fue inválida
    }

    const veterinaria = veterinarias[id];
    console.log(`Veterinaria seleccionada: ${veterinaria.getNombre()} (${veterinaria.getDireccion()})`);
    GestorPrograma.esperarEnter();

    return veterinaria;
}

    private gestorClientes2() {
    console.clear();
    let veterinaria = this.seleccionarVeterinaria();
    if (veterinaria === null) return; // Salir si no se seleccionó una veterinaria

    let opcionSeleccionada: number;
    this.mensajeOpciones("Aqui podra Crear o Modificar Clientes");
    do {
        opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Cliente \n 2 - Ver Lista de Clientes\n 3 - Modificar Cliente \n 4 - Eliminar Cliente\n 5 - Volver");
        switch (opcionSeleccionada) {
            case 1: veterinaria.crearCliente(veterinaria); break;
            case 2: veterinaria.listarClientes(veterinaria); break;
            case 3: veterinaria.modificarCliente(veterinaria); break;
            case 4: veterinaria.eliminarCliente(veterinaria); break;
            case 5: console.log("Volviendo..."); console.clear(); break;
            default: console.log("Opción no válida. Por favor, intente nuevamente.");
            GestorPrograma.esperarEnter();
            console.clear();
        }
    } while (opcionSeleccionada !== 5);
};

private gestorProveedores2(){
    console.clear();
    let veterinaria = this.seleccionarVeterinaria();
    if (veterinaria === null) return; // Salir si no se seleccionó una veterinaria

    let opcionSeleccionada: number;
    this.mensajeOpciones("Aqui podra Crear o Modificar Proveedores");
    do {
        opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Proveedor \n 2 - Ver Lista de Proveedores \n 3 - Modificar Proveedor \n 4 - Eliminar Proveedor \n 5 - Volver");
        switch (opcionSeleccionada) {
            case 1: veterinaria.crearProveedor(veterinaria); break;
            case 2: veterinaria.listarProveedores(veterinaria); break;
            case 3: veterinaria.modificarProveedor(veterinaria); break;
            case 4: veterinaria.eliminarProveedor(veterinaria); break;
            case 5: console.log("Volviendo..."); console.clear(); break;
            default: console.log("Opción no válida. Por favor, intente nuevamente.");
            GestorPrograma.esperarEnter();
            console.clear();
        }
    } while (opcionSeleccionada !== 5);
};

    //Comprueba si el cliente existe ya o no y dependiende de eso le muestra un Menu diferente
    private comprobarCliente(){
        //verifica que haya veterinarias creadas previamente.
        if (this.listaVeterinarias.length!=0){
            console.clear();
        let dniCliente:number = rls.questionInt("Ingrese su dni: ");
        let cliente:Cliente | null=this.buscarClientePorDni(dniCliente);
        if (cliente !== null){
            this.ejecutarComoCliente(cliente);
        }else{
            let opcionSeleccionada:number;
            this.mensajeOpciones("No se encontro ningun cliente con dicho Dni");
            do{
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Cliente \n 2 - Ingresar Dni nuevamente\n 3 - Volver");
            switch (opcionSeleccionada) {
                case 1: this.crearNuevoCliente(dniCliente); break;
                case 2: this.comprobarCliente();
                        opcionSeleccionada = 3; 
                        break;
                case 3: console.log("Volviendo...")
                        console.clear(); 
                        break;
                        default: console.log("Opción no válida. Por favor, intente nuevamente.");
                        GestorPrograma.esperarEnter();
                        console.clear();
            }
        }while (opcionSeleccionada!==3);
        }
        }else{
            console.log("No hay veterinarias creadas aun, contactese con un Administrador");
            GestorPrograma.esperarEnter();
            console.clear();
        }
        
    };

    //Comprueba si el cliente ya existe a partir de su Dni.
    public buscarClientePorDni(dni: number): Cliente | null {
        let clienteEncontrado: Cliente | null = null;
    
        this.listaClientes.forEach(cliente => {
          if (clienteEncontrado === null && cliente.getDni() === dni) {
            clienteEncontrado = cliente;
          }
        });
    
        return clienteEncontrado;
      }

    //Menu para clientes.
    private ejecutarComoCliente(cliente : Cliente){
        
        console.clear();
        let opcionSeleccionada: number;
        this.mensajeOpciones("Bienvenido "+ cliente.getNombre());
        if (cliente.getMascotas().length<=0 || cliente.getNumeroVisitas() == 0){
            do {             
                opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3 - Volver");  
                switch (opcionSeleccionada) {
                    case 1: console.log(` Nombre: ${cliente.getNombre()}\n Dni: ${cliente.getDni()}\n Telefono ${cliente.getTelefono()}`); 
                            GestorPrograma.esperarEnter();
                            break;
                    case 2: if (cliente.getMascotas().length==0)
                            {console.log("Aun no a Cargado ninguna mascota")
                                this.crearNuevaMascota(cliente);
                            }
                            else
                            {console.log(cliente.getMascotas())};
                            GestorPrograma.esperarEnter();
                             break;
                    case 3: console.log("Volviendo..."); break;
                    default: console.log("Opción no válida. Por favor, intente nuevamente.");
                    GestorPrograma.esperarEnter();
                    console.clear();   
                }
            } while (opcionSeleccionada !==3);
        }else{
                do {
                opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3- Salir");
                switch (opcionSeleccionada) {
                    case 1: console.log(` Nombre: ${cliente.getNombre()}\n Dni: ${cliente.getDni()}\n Telefono ${cliente.getTelefono()}`);
                            GestorPrograma.esperarEnter();
                            break;
                    case 2: this.listarMascotas(cliente)
                            GestorPrograma.esperarEnter(); 
                            break;
                    case 3: console.log("Saliendo..."); break;
                    default: console.log("Opción no válida. Por favor, intente nuevamente.");
                    GestorPrograma.esperarEnter();
                    console.clear();
                }
            } while (opcionSeleccionada !==3);    
        }
    }  

    crearNuevaMascota(cliente:Cliente){
        console.clear();
        let id="1";
        let nombre:string = rls.question("Ingrese Nombre de su Mascota: ");
        let especie =  rls.question("Ingrese Especie de su Mascota: ");
        let idPropietario = cliente.getId();

        const mascota : Paciente = new Paciente (nombre, especie, idPropietario);
        cliente.setMascotas(mascota);
        console.log("Mascota Agregada Exitosamente")
        GestorPrograma.esperarEnter();
        this.ejecutarComoCliente(cliente);
    }

    listarMascotas(cliente: Cliente): Paciente[] | undefined {
        console.clear();
        let mascotas : Paciente[] | undefined = cliente.getMascotas();
        if (mascotas.length==0){
            console.log("No hay mascotas para mostrar")
        }else{
            return mascotas;
        }
    }

    private crearNuevoCliente(dni : number){
        console.clear();
        let id="5";
        let nombre:string = rls.question("Ingrese su Nombre: ");
        let telefono:number=rls.questionInt("Ingrese su Telefono: ");

        const cliente : Cliente = new Cliente (nombre, telefono, dni);
        this.listaClientes.push(cliente);
        console.log("Cliente Creado Exitosamente")
        GestorPrograma.esperarEnter();
        this.ejecutarComoCliente(cliente);
    }  


    
    //CRUD Proveedores
    private crearProveedor(){
        if (this.listaVeterinarias.length!=0){
            //this.listarVeterinarias();
            let id:number = rls.questionInt("Ingrese el numero de la Veterinaria al que desee asignar proveedor: ")-1;
            if (id<0 || id > this.listaVeterinarias.length-1){
                console.log("Numero Invalido")
                GestorPrograma.esperarEnter();
            }else{
                let veterinaria : Veterinaria = this.listaVeterinarias[id];
                console.log(`Veterinaria: ${veterinaria.getNombre()} Direccion: ${veterinaria.getDireccion()}`)
                console.clear();
                let nombre:string  = rls.question("Ingrese el nombre del Proveedor: ");
                let contacto:string  = rls.question("Ingrese el numero telefonico del Proveedor: ");
                //const proveedor:Proveedor = new Proveedor(nombre, contacto);
                //veterinaria.setProveedor(proveedor);
                //console.log(`${proveedor.constructor.name}: ${proveedor.getNombre()}, Agregado Exitosamente a la ${veterinaria.constructor.name}: ${veterinaria.getNombre()}`);
                GestorPrograma.esperarEnter();
                console.clear();
                //if (rls.keyInYNStrict(`Desea agregar otro: ${proveedor.constructor.name} a la ${veterinaria.constructor.name}: ${veterinaria.getNombre()}`)) {
                    //Ejecuta nuevamente el Metodo crearProveedor
                    this.crearProveedor();
                //}
        }
    }else{
        console.log("No hay Veterinarias Creadas aun, debera crear una para asignarle proovedores");
        GestorPrograma.esperarEnter();
        //this.crearVeterinaria();
    }
    }
    private listarProveedores(){}
    private modificarProveedor(){}
    private eliminarProveedor(){}

    
    

    private gestorPacientes(){
        console.clear();
        let opcionSeleccionada: number;
        this.mensajeOpciones("Aqui podra Crear o Modificar Pacientes");
            do {
                opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Paciente \n 2 - Ver Lista de Pacientes\n 3 - Modificar Paciente \n 4 - Eliminar Paciente\n 5 - Volver");
                switch (opcionSeleccionada) {
                    case 1: this.crearPaciente(); break;
                    case 2: this.listarPacientes(); break;
                    case 3: this.modificarPaciente(); break;
                    case 4: this.eliminarPaciente(); break;
                    case 5: console.log("Volviendo...");
                            this.ejecutarComoAdministrador;
                            console.clear(); 
                            break;
                            default: console.log("Opción no válida. Por favor, intente nuevamente.");
                            GestorPrograma.esperarEnter();
                            console.clear();
                }
            } while (opcionSeleccionada !==5);
    };
    //CRUD Pacientes
    private crearPaciente(): void {
    // Validar si existen veterinarias
    if (this.listaVeterinarias.length === 0) {
        console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
        GestorPrograma.esperarEnter();
        //this.crearVeterinaria();
        //return; // Salir porque no se puede continuar
    }

    // Seleccionar veterinaria
    //this.listarVeterinarias();
    const idVeterinaria = this.menuOpciones("Ingrese el número de la Veterinaria a la que desea asignar el Paciente: ");
    const veterinaria = this.listaVeterinarias[idVeterinaria-1];
    // Validar si existen clientes en la veterinaria
    if (veterinaria.getlistaClientes().length === 0) {
        console.log("No hay Clientes creados en esta Veterinaria. Cree uno para continuar.");
        GestorPrograma.esperarEnter();
        //this.crearCliente();
        //return; // Salir porque no se puede continuar
    }

    // Seleccionar cliente
    //const clientes = veterinaria.getCliente();
    //this.listarClientes();
    //const idCliente = this.menuOpciones("Ingrese el número del Cliente al que desea asignar el Paciente: ", 1, clientes.length);
    //const cliente = clientes[idCliente-1];

    // Crear paciente
    const nombre = rls.question("Ingrese el nombre de la Mascota: ");
    const tipo = rls.question("Ingrese el tipo de Mascota: ");
    //const mascota = new Paciente(nombre, tipo, cliente.getId());
    //cliente.setMascotas(mascota);

    //console.log(`${mascota.constructor.name}: ${mascota.getNombre()} agregado exitosamente al ${cliente.constructor.name}: ${cliente.getNombre()} en la ${veterinaria.constructor.name}: ${veterinaria.getNombre()}.`);
    GestorPrograma.esperarEnter();
    console.clear();
}

    private listarPacientes(){}
    private modificarPaciente(){}
    private eliminarPaciente(){}

    //Funcion que Recibe mensaje y Opciones disponibles
    private menuOpciones(mensaje: string): number {
        let opcionSeleccionada: number;
            console.log(mensaje);
            opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
            console.clear();
        return opcionSeleccionada;
    }
    //Funcion para personalizar el mensaje de Opciones
    private mensajeOpciones(mensaje:string):void{
        console.clear();
        console.log(mensaje);
        console.log("-------------------------------------");
        console.log("Ingrese La Opcion Que Desee");
    }

    //Funcion para pedirle una entrada de Enter al usuario antes de seguir
    public static esperarEnter(): void {
        rls.question("Presione Enter para continuar...");
    }
}


