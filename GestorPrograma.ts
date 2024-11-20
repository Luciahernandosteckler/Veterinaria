import * as rls from 'readline-sync';
import {Cliente} from "./Clientes";
import {Paciente} from "./Paciente";
import {Proveedor} from "./Proveedor";
import {RedVeterinarias} from "./RedVeterinarias";
import {Veterinaria} from "./Veterinaria";


export class GestorPrograma{
    private nombre :string;
    private listaClientes : Cliente[]=[];
    private listaVeterinarias : Veterinaria[]=[];

    constructor(nombre:string){
        this.nombre=nombre;
    }
    
    //Menu principal identificacion (Administrador o Cliente)
    public opcionesGestorVeterinarias(): void {
        //console.clear();
        let opcionSeleccionada: number;
        this.mensajeOpciones("Bienvenido al Gestor de Veterinarias");
        do{
            opcionSeleccionada = this.menuOpciones(" 1 - Soy Administrador \n 2 - Soy Cliente\n 3 - Salir", 1, 3);
            switch (opcionSeleccionada) {
                case 1: this.ejecutarComoAdministrador(); break;
                case 2: this.comprobarCliente(); break;
                case 3: console.log("Saliendo..."); break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !==3);
    }

    //Menu para Administradores
    private ejecutarComoAdministrador(){
        console.clear();
        let opcionSeleccionada: number;
        this.mensajeOpciones("Bienvenido administrador");
        do{
            opcionSeleccionada = this.menuOpciones(" 1 - Gestor de Veterinarias \n 2 - Gestor de Proovedores\n 3 - Gestor de Clientes\n 4 - Gestor de Pacientes \n 5 - Volver ", 1, 5);
            switch (opcionSeleccionada) {
                case 1: this.gestorVeterinarias(); break;
                case 2: this.gestorProveedores(); break;
                case 3: this.gestorClientes(); break;
                case 4: this.gestorPacientes(); break;
                case 5: console.log("Volviendo...");
                        console.clear();
                        break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !==5);
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
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Cliente \n 2 - Ingresar Dni nuevamente\n 3 - Volver", 1, 3);
            switch (opcionSeleccionada) {
                case 1: this.crearNuevoCliente(dniCliente); break;
                case 2: this.comprobarCliente();
                        opcionSeleccionada = 3; 
                        break;
                case 3: console.log("Volviendo...")
                        console.clear(); 
                        break;
                default: console.log("Error de Datos");
            }
            
        }
        }else{
            console.log("No hay veterinarias creadas aun, contactese con un Administrador");
            this.esperarEnter();
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
            opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3 - Volver", 1, 3);
            do {    
                switch (opcionSeleccionada) {
                    case 1: console.log(` Nombre: ${cliente.getNombre()}\n Dni: ${cliente.getDni()}\n Telefono ${cliente.getTelefono()}`); 
                            this.esperarEnter();
                            break;
                    case 2: if (cliente.getMascotas().length==0)
                            {console.log("Aun no a Cargado ninguna mascota")
                                this.crearNuevaMascota(cliente);
                            }
                            else
                            {console.log(cliente.getMascotas())};
                            this.esperarEnter();
                             break;
                    case 3: console.log("Volviendo..."); break;
                    default: console.log("Error de Datos");    
                }
            } while (opcionSeleccionada !==3);
        }else{
                opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3- Salir", 1, 3);
                do {
                switch (opcionSeleccionada) {
                    case 1: console.log(` Nombre: ${cliente.getNombre()}\n Dni: ${cliente.getDni()}\n Telefono ${cliente.getTelefono()}`);
                            this.esperarEnter();
                            break;
                    case 2: this.listarMascotas(cliente)
                            this.esperarEnter(); 
                            break;
                    case 3: console.log("Saliendo..."); break;
                    default: console.log("Error de Datos");
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
        this.esperarEnter();
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
        this.esperarEnter();
        this.ejecutarComoCliente(cliente);
    }  

    private gestorVeterinarias(){
        console.clear()
        let opcionSeleccionada: number;
        this.mensajeOpciones("Aqui podra Crear o Modificar Veterinarias");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nueva Veterinaria \n 2 - Ver Lista de Veterinarias\n 3 - Modificar Veterinaria \n 4 - Eliminar Veterinaria\n 5 - Volver", 1, 5);
            switch (opcionSeleccionada) {
                case 1: this.crearVeterinaria(); break;
                case 2: this.listarVeterinarias(); break;
                case 3: this.modificarVeterinaria(); break;
                case 4: this.eliminarVeterinaria(); break;
                case 5: console.log("Volviendo...")
                        console.clear(); 
                        break;
                default: console.log("Error de Datos");
            }
        } while ( opcionSeleccionada !== 5);
    };
    //CRUD Veterinarias
    private crearVeterinaria(){
        console.clear();
        let nombre:string  = rls.question("Ingrese el nombre de la Veterinaria: ");
        console.log("Ingrese Direccion de la Veterinaria: ");
        let calle: string = rls.question("Calle: ");
        let numero : number = rls.questionInt("Numero: ");
        let direccion : string = `${calle} : ${numero}`;
        const veterinaria = new Veterinaria(nombre, direccion);
        this.listaVeterinarias.push(veterinaria);
        console.log(`Veterinaria: ${veterinaria.getNombre()}, Agregada Exitosamente`);
        this.esperarEnter();
        console.clear();
        if (rls.keyInYNStrict(`Desea agregar otra: ${veterinaria.constructor.name}`)) {
           //Ejecuta nuevamente el Metodo crearVeterinaria 
            this.crearVeterinaria();
        }
        
    }
    private listarVeterinarias() {
        console.clear();
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay veterinarias registradas.");
        } else {
            console.log("\n--- Lista de Veterinarias ---");
            this.listaVeterinarias.forEach((vet, index) => {
                console.log(`${index + 1}. Veterinaria: ${vet.getNombre()} Direccion - ${vet.getDireccion()}`);
            });
        }
        this.esperarEnter();
        console.clear();
    }

    private modificarVeterinaria(){
        this.listarVeterinarias();
        let id:number = rls.questionInt("Ingrese el numero de la Veterinaria que desee modificar: ")-1;
        if (id<0 || id > this.listaVeterinarias.length-1){
            console.log("Numero Invalido")
            this.esperarEnter();
        }else{
        let veterinaria : Veterinaria = this.listaVeterinarias[id];
        console.log(`Veterinaria: ${veterinaria.getNombre()} Direccion: ${veterinaria.getDireccion()}`)
            let nuevoNombre: string = rls.question("Ingrese nuevo nombre (o presione Enter para no modificar): ");
            let nuevaCalle: string = rls.question("Ingrese nueva calle (o presione Enter para no modificar): ");
            let nuevaNumeracion: number = rls.questionInt("Ingrese nueva numeracion (o ingrese 0 para no modificar): ");

            if (nuevoNombre) {
                    veterinaria.setNombre(nuevoNombre);
                    console.log("Nombre Modificado Correctamente")
            }
            if (nuevaCalle && nuevaNumeracion!=0){
                    veterinaria.setDireccion(`${nuevaCalle} ${nuevaNumeracion}`)
                    console.log("Direccion modificada correctamente ")
                };
                this.esperarEnter();
                console.clear();
                if (rls.keyInYNStrict(`Desea modificar otra: ${veterinaria.constructor.name}`)) {
                    //Ejecuta nuevamente el Metodo modificarVeterinaria 
                     this.modificarVeterinaria();
                 }
        }
    }
    private eliminarVeterinaria(){
        this.listarVeterinarias();
        let id:number = rls.questionInt("Ingrese el numero de la Veterinaria que desee eliminar: ")-1;
        if (id<0 || id > this.listaVeterinarias.length-1){
            console.log("Numero Invalido")
            this.esperarEnter();
        }else{
        let veterinaria : Veterinaria = this.listaVeterinarias[id];
        console.log(`Veterinaria: ${veterinaria.getNombre()} Direccion: ${veterinaria.getDireccion()}`)
            let opcionSeleccionada:number;
            if (rls.keyInYNStrict(`Esta seguro que desea eliminar la ${veterinaria.constructor.name}`)) {
                // Elimina el vehículo de la lista
                this.listaVeterinarias = this.listaVeterinarias.filter(v => v !== veterinaria);
                console.log(`${veterinaria.constructor.name} eliminado con éxito.`);
            } else {
                console.log("Eliminación cancelada.");
            }
            if (rls.keyInYNStrict(`Desea eliminar otra: ${veterinaria.constructor.name}`)) {
                //Ejecuta nuevamente el Metodo eliminarVeterinaria 
                 this.eliminarVeterinaria();
             }
        }

    }

    private gestorProveedores(){
        console.clear();
        let opcionSeleccionada: number;
        this.mensajeOpciones("Aqui podra Crear o Modificar Proveedores");
        do {
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Proveedor \n 2 - Ver Lista de Proovedores\n 3 - Modificar Proveedor \n 4 - Eliminar Proveedor\n 5 - Volver", 1, 5);
            switch (opcionSeleccionada) {
                case 1: this.crearProveedor(); break;
                case 2: this.listarProveedores(); break;
                case 3: this.modificarProveedor(); break;
                case 4: this.eliminarProveedor(); break;
                case 5: console.log("Volviendo...")
                        console.clear(); 
                        break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !==5);
    };
    //CRUD Proveedores
    private crearProveedor(){
        if (this.listaVeterinarias.length!=0){
            this.listarVeterinarias();
            let id:number = rls.questionInt("Ingrese el numero de la Veterinaria al que desee asignar proveedor: ")-1;
            if (id<0 || id > this.listaVeterinarias.length-1){
                console.log("Numero Invalido")
                this.esperarEnter();
            }else{
                let veterinaria : Veterinaria = this.listaVeterinarias[id];
                console.log(`Veterinaria: ${veterinaria.getNombre()} Direccion: ${veterinaria.getDireccion()}`)
                console.clear();
                let nombre:string  = rls.question("Ingrese el nombre del Proveedor: ");
                let contacto:string  = rls.question("Ingrese el numero telefonico del Proveedor: ");
                const proveedor:Proveedor = new Proveedor(nombre, contacto);
                veterinaria.setProveedor(proveedor);
                console.log(`${proveedor.constructor.name}: ${proveedor.getNombre()}, Agregado Exitosamente a la ${veterinaria.constructor.name}: ${veterinaria.getNombre()}`);
                this.esperarEnter();
                console.clear();
                if (rls.keyInYNStrict(`Desea agregar otro: ${proveedor.constructor.name} a la ${veterinaria.constructor.name}: ${veterinaria.getNombre()}`)) {
                    //Ejecuta nuevamente el Metodo crearProveedor
                    this.crearProveedor();
                }
        }
    }else{
        console.log("No hay Veterinarias Creadas aun, debera crear una para asignarle proovedores");
        this.esperarEnter();
        this.crearVeterinaria();
    }
    }
    private listarProveedores(){}
    private modificarProveedor(){}
    private eliminarProveedor(){}

    private gestorClientes(){
        console.clear();
        let opcionSeleccionada: number;
        this.mensajeOpciones("Aqui podra Crear o Modificar Clientes");
            do {
                opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Cliente \n 2 - Ver Lista de Clientes\n 3 - Modificar Cliente \n 4 - Eliminar Cliente\n 5 - Volver", 1, 5);
            switch (opcionSeleccionada) {
                case 1: this.crearCliente(); break;
                case 2: this.listarClientes(); break;
                case 3: this.modificarCliente(); break;
                case 4: this.eliminarCliente(); break;
                case 5: console.log("Volviendo...");
                        console.clear(); 
                        break;
                default: console.log("Error de Datos");
            }
        } while (opcionSeleccionada !==5);
    };
    //CRUD Clientes
    private crearCliente(): void {
        // Validar si hay veterinarias creadas
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
            this.esperarEnter();
            this.crearVeterinaria();
            return; // Salir porque no se puede continuar
        }
    
        // Seleccionar veterinaria
        this.listarVeterinarias();
        const idVeterinaria = this.menuOpciones(
            "Ingrese el número de la Veterinaria a la que desea asignar un Cliente: ",
            1,
            this.listaVeterinarias.length
        ) - 1; // Ajustar índice a base 0
        const veterinaria = this.listaVeterinarias[idVeterinaria];
    
        console.clear();
        console.log(`Veterinaria seleccionada: ${veterinaria.getNombre()} (${veterinaria.getDireccion()})`);
            // Crear cliente
            const nombre = rls.question("Ingrese el nombre del Cliente: ");
            const telefono = rls.questionInt("Ingrese el número telefónico del Cliente: ");
            const dni = rls.questionInt("Ingrese el DNI del Cliente: ");
            const cliente = new Cliente(nombre, telefono, dni);
    
            // Asignar cliente a la veterinaria
            veterinaria.setCliente(cliente);
            console.log(`Cliente ${cliente.getNombre()} agregado exitosamente a ${veterinaria.getNombre()}.`);
    
            // Preguntar si desea agregar otro cliente
            if (rls.keyInYNStrict(`Desea agregar otro: ${cliente.constructor.name} a la ${veterinaria.constructor.name}: ${veterinaria.getNombre()}`)) {
                //Ejecuta nuevamente el Metodo crearProveedor
                this.crearClientePorVeterinaria(veterinaria);
            }else{
                return;
            }
            console.clear();
            
        
    }
    private crearClientePorVeterinaria(veterinaria:Veterinaria): void {
        console.clear();
        console.log(`Veterinaria seleccionada: ${veterinaria.getNombre()} (${veterinaria.getDireccion()})`);
            // Crear cliente
            const nombre = rls.question("Ingrese el nombre del Cliente: ");
            const telefono = rls.questionInt("Ingrese el número telefónico del Cliente: ");
            const dni = rls.questionInt("Ingrese el DNI del Cliente: ");
            const cliente = new Cliente(nombre, telefono, dni);
    
            // Asignar cliente a la veterinaria
            veterinaria.setCliente(cliente);
            console.log(`Cliente ${cliente.getNombre()} agregado exitosamente a ${veterinaria.getNombre()}.`);
    
            // Preguntar si desea agregar otro cliente
            if (rls.keyInYNStrict(`Desea agregar otro: ${cliente.constructor.name} a la ${veterinaria.constructor.name}: ${veterinaria.getNombre()}`)) {
                //Ejecuta nuevamente el Metodo crearProveedor
                this.crearClientePorVeterinaria(veterinaria);
            }else{
                this.gestorClientes();
            }
            console.clear();
            
        
    }

    private listarClientes(): void {
        // Validar si hay veterinarias creadas
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
            this.esperarEnter();
            this.crearVeterinaria();
            return; // Salir porque no se puede continuar
        }
    
        // Seleccionar veterinaria
        this.listarVeterinarias();
        const idVeterinaria = this.menuOpciones(
            "Ingrese el número de la Veterinaria para ver sus Clientes: ",
            1,
            this.listaVeterinarias.length
        ) - 1; // Ajustar índice a base 0
        const veterinaria = this.listaVeterinarias[idVeterinaria];
    
        // Validar si hay clientes asociados
        const clientes = veterinaria.getCliente();
        if (clientes.length === 0) {
            console.log(`No hay Clientes registrados en la Veterinaria ${veterinaria.getNombre()}.`);
            if (rls.keyInYNStrict(`Desea crear un nuevo cliente a la ${veterinaria.constructor.name}: ${veterinaria.getNombre()}`)) {
                //Ejecuta nuevamente el Metodo crearProveedor
                this.crearCliente();
            }else{
                return; // Salir porque no hay nada que listar
            }
        }
    
        // Listar clientes
        console.log(`Clientes registrados en ${veterinaria.getNombre()}:`);
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.getNombre()} (Tel: ${cliente.getTelefono()}, DNI: ${cliente.getDni()})`);
        });
    
        this.esperarEnter();
        console.clear();
        this.gestorClientes();
    }

    private modificarCliente(){}
    private eliminarCliente(){}

    private gestorPacientes(){
        console.clear();
        let opcionSeleccionada: number;
        this.mensajeOpciones("Aqui podra Crear o Modificar Pacientes");
            do {
                opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Paciente \n 2 - Ver Lista de Pacientes\n 3 - Modificar Paciente \n 4 - Eliminar Paciente\n 5 - Volver", 1, 5);
                switch (opcionSeleccionada) {
                    case 1: this.crearPaciente(); break;
                    case 2: this.listarPacientes(); break;
                    case 3: this.modificarPaciente(); break;
                    case 4: this.eliminarPaciente(); break;
                    case 5: console.log("Volviendo...");
                            this.ejecutarComoAdministrador;
                            console.clear(); 
                            break;
                    default: console.log("Error de Datos");
                }
            } while (opcionSeleccionada !==5);
    };
    //CRUD Pacientes
    private crearPaciente(): void {
    // Validar si existen veterinarias
    if (this.listaVeterinarias.length === 0) {
        console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
        this.esperarEnter();
        this.crearVeterinaria();
        //return; // Salir porque no se puede continuar
    }

    // Seleccionar veterinaria
    this.listarVeterinarias();
    const idVeterinaria = this.menuOpciones(
        "Ingrese el número de la Veterinaria a la que desea asignar el Paciente: ", 1, (this.listaVeterinarias.length));
    const veterinaria = this.listaVeterinarias[idVeterinaria-1];
    // Validar si existen clientes en la veterinaria
    if (veterinaria.getCliente().length === 0) {
        console.log("No hay Clientes creados en esta Veterinaria. Cree uno para continuar.");
        this.esperarEnter();
        this.crearCliente();
        //return; // Salir porque no se puede continuar
    }

    // Seleccionar cliente
    const clientes = veterinaria.getCliente();
    this.listarClientes();
    const idCliente = this.menuOpciones(
        "Ingrese el número del Cliente al que desea asignar el Paciente: ", 1, clientes.length);
    const cliente = clientes[idCliente-1];

    // Crear paciente
    const nombre = rls.question("Ingrese el nombre de la Mascota: ");
    const tipo = rls.question("Ingrese el tipo de Mascota: ");
    const mascota = new Paciente(nombre, tipo, cliente.getId());
    cliente.setMascotas(mascota);

    console.log(
        `${mascota.constructor.name}: ${mascota.getNombre()} agregado exitosamente al ${cliente.constructor.name}: ${cliente.getNombre()} en la ${veterinaria.constructor.name}: ${veterinaria.getNombre()}.`
    );
    this.esperarEnter();
    console.clear();
}

    private listarPacientes(){}
    private modificarPaciente(){}
    private eliminarPaciente(){}
    
    private validarVeterinarias(): Veterinaria | null {
        if (this.listaVeterinarias.length === 0) {
            console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
            this.esperarEnter();
            this.crearVeterinaria();
            return null;
        }
        return this.listaVeterinarias[
            this.menuOpciones("Seleccione una Veterinaria: ", 1, this.listaVeterinarias.length) - 1
        ];
    }

    //Funcion que Recibe mensaje y Opciones disponibles
    private menuOpciones(mensaje: string, min: number, max: number): number {
        let opcionSeleccionada: number;
        do {
            console.log(mensaje);
            opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
            console.clear();
        } while (opcionSeleccionada < min || opcionSeleccionada > max);
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
    private esperarEnter(): void {
        rls.question("Presione Enter para continuar...");
    }
}


