import * as rls from 'readline-sync';
import { Cliente } from "./Clientes";
import { Paciente } from "./Paciente";
import { Proveedor } from "./Proveedor";
import { RedVeterinarias } from "./RedVeterinarias";
import { Veterinaria } from "./Veterinaria";


export class GestorPrograma {
    private nombre: string;
    private redVeterinarias: RedVeterinarias;
    private listaClientes: Cliente[] = [];
    private listaVeterinarias: Veterinaria[] = [];

    constructor(nombre: string) {
        this.nombre = nombre;
        this.redVeterinarias = new RedVeterinarias("Red de Veterinarias");
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
        do {
            this.mensajeOpciones("Bienvenido al Gestor de Veterinarias");
            opcionSeleccionada = this.menuOpciones(" 1 - Soy Administrador \n 2 - Soy Cliente\n 3 - Salir");
            switch (opcionSeleccionada) {
                case 1: this.ejecutarComoAdministrador(); break;
                case 2: this.menuCliente(); break;
                case 3: console.log("Saliendo..."); break;
                default: console.log("Opción no válida. Por favor, intente nuevamente.");
                    GestorPrograma.esperarEnter();
                    console.clear();
            }
        } while (opcionSeleccionada !== 3);
    }

    //Menu para Administradores.
    private ejecutarComoAdministrador() {
        console.clear();
        let opcionSeleccionada: number;
        do {
            this.mensajeOpciones("Bienvenido administrador");
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
        } while (opcionSeleccionada !== 5);
    };

    //Gestiona los CRUD DE VETERINARIAS.
    private gestorVeterinarias() {
        console.clear()
        let opcionSeleccionada: number;
        do {
            this.mensajeOpciones("Aqui podra Crear o Modificar Veterinarias");
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nueva Veterinaria \n 2 - Ver Lista de Veterinarias\n 3 - Modificar Veterinaria \n 4 - Eliminar Veterinaria\n 5 - Volver");
            switch (opcionSeleccionada) {
                case 1: this.redVeterinarias.crearVeterinaria(); opcionSeleccionada = 5; break;
                case 2: this.redVeterinarias.listarVeterinarias(); opcionSeleccionada = 5; break;
                case 3: this.redVeterinarias.modificarVeterinaria(); opcionSeleccionada = 5; break;
                case 4: this.redVeterinarias.eliminarVeterinaria(); opcionSeleccionada = 5; break;
                case 5: console.log("Volviendo...")
                    opcionSeleccionada = 5;
                    console.clear();
                    break;
                default: console.log("Opción no válida. Por favor, intente nuevamente.");
                    GestorPrograma.esperarEnter();
                    console.clear();
            }
        } while (opcionSeleccionada !== 5);
    };

    // Comprueba si hay veterinarias en la Red y permite seleccionar una
    private seleccionarVeterinaria(): Veterinaria {
        const veterinarias = this.redVeterinarias.getVeterinarias();
        if (veterinarias.length === 0) {
            console.log("No hay Veterinarias creadas aún. Por favor, cree una para continuar.");
            this.redVeterinarias.crearVeterinaria();
        }
        this.redVeterinarias.listarVeterinarias();
        const id = rls.questionInt("Ingrese el número de la Veterinaria que desea seleccionar: ") - 1;

        if (id < 0 || id >= veterinarias.length) {
            console.log("Número inválido. Regresando al menú principal.");
            GestorPrograma.esperarEnter();
        }

        const veterinaria = veterinarias[id];
        console.log(`Veterinaria seleccionada: ${veterinaria.getNombre()} (${veterinaria.getDireccion()})`);
        GestorPrograma.esperarEnter();
        return veterinaria;
    }

    private seleccionarVeterinariaCliente(): Veterinaria | null {
        const veterinarias : Veterinaria[] = this.redVeterinarias.getVeterinarias();
        let veterinaria : Veterinaria | null = null;
        if (veterinarias.length === 0) {
            console.log("No hay Veterinarias creadas aún. Por favor, comuniquese con un administrador.");
            GestorPrograma.esperarEnter();
        }else{
            this.redVeterinarias.listarVeterinarias();
            const id = rls.questionInt("Ingrese el número de la Veterinaria que desea seleccionar: ") - 1;

            if (id < 0 || id >= veterinarias.length) {
                console.log("Número inválido. Regresando al menú principal.");
                GestorPrograma.esperarEnter();
            }else{
                veterinaria = veterinarias[id];
                console.log(`Veterinaria seleccionada: ${veterinaria.getNombre()} (${veterinaria.getDireccion()})`);
                GestorPrograma.esperarEnter();
            }
        }
        
        return veterinaria;
    }

    // Método para gestionar clientes
    private gestorClientes(): void {
        console.clear();
        const veterinaria = this.seleccionarVeterinaria();

        // Salir si no se seleccionó ninguna veterinaria
        if (veterinaria != null) {
            let opcionSeleccionada: number;
            do {
                this.mensajeOpciones("Aquí podrá Crear o Modificar Clientes");
                opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Cliente \n 2 - Ver Lista de Clientes\n 3 - Modificar Cliente \n 4 - Eliminar Cliente \n 5 - Volver");

                switch (opcionSeleccionada) {
                    case 1:
                        veterinaria.crearCliente();
                        break;
                    case 2:
                        veterinaria.listarClientes();
                        break;
                    case 3:
                        veterinaria.modificarCliente();
                        break;
                    case 4:
                        veterinaria.eliminarCliente();
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
        do {
            this.mensajeOpciones("Aquí podrá Crear o Modificar Proveedores");
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Proveedor \n 2 - Ver Lista de Proveedores \n 3 - Modificar Proveedor \n 4 - Eliminar Proveedor \n 5 - Volver");

            switch (opcionSeleccionada) {
                case 1:
                    veterinaria.crearProveedor();
                    break;
                case 2:
                    veterinaria.listarProveedores();
                    break;
                case 3:
                    veterinaria.modificarProveedor();
                    break;
                case 4:
                    veterinaria.eliminarProveedor();
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

    private gestorPacientes() {
        console.clear();
        const veterinaria = this.seleccionarVeterinaria();
        // Salir si no se seleccionó ninguna veterinaria
        if (!veterinaria) return;

        const cliente  = this.seleccionarCliente(veterinaria);

        let opcionSeleccionada: number;

        do {
            this.mensajeOpciones("Aqui podra Crear o Modificar Pacientes");
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Paciente \n 2 - Ver Lista de Pacientes\n 3 - Modificar Paciente \n 4 - Eliminar Paciente\n 5 - Volver");
            switch (opcionSeleccionada) {
                case 1: cliente.crearMascota(); break;
                case 2: cliente.listarMascotas(); break;
                case 3: cliente.modificarMascota(); break;
                case 4: cliente.eliminarMascota(); break;
                case 5: console.log("Volviendo...");
                    console.clear();
                    break;
                default: console.log("Opción no válida. Por favor, intente nuevamente.");
                    GestorPrograma.esperarEnter();
                    console.clear();
            }
        } while (opcionSeleccionada !== 5);
    };
    
    private ejecutarComoCliente(cliente: Cliente) {

        console.clear();
        let opcionSeleccionada: number;
        this.mensajeOpciones("Bienvenido " + cliente.getNombre());
        if (cliente.getMascotas().length <= 0 || cliente.getNumeroVisitas() == 0) {
            do {
                opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3 - Volver");
                switch (opcionSeleccionada) {
                    case 1: console.log(` Nombre: ${cliente.getNombre()}\n Dni: ${cliente.getDni()}\n Telefono ${cliente.getTelefono()}`);
                        GestorPrograma.esperarEnter();
                        break;
                    case 2: if (cliente.getMascotas().length == 0) {
                            console.log("Aun no a Cargado ninguna mascota")
                            GestorPrograma.esperarEnter();
                            cliente.crearMascota();
                        }else{
                            this.gestorMascotas(cliente) };
                            GestorPrograma.esperarEnter();
                        break;
                    case 3: console.log("Volviendo..."); break;
                    default: console.log("Error de Datos");
                }
            } while (opcionSeleccionada !== 3);
        } else {
            opcionSeleccionada = this.menuOpciones(" 1 - Datos Personales \n 2 - Mis Mascotas\n 3- Salir");
            do {
                switch (opcionSeleccionada) {
                    case 1: console.log(` Nombre: ${cliente.getNombre()}\n Dni: ${cliente.getDni()}\n Telefono ${cliente.getTelefono()}`);
                        GestorPrograma.esperarEnter();
                        break;
                        case 2: this.gestorMascotas(cliente);
                        GestorPrograma.esperarEnter();
                        break;
                    case 3: console.log("Saliendo..."); break;
                    default: console.log("Error de Datos");
                }
            } while (opcionSeleccionada !== 3);
        }
    }

    private menuCliente() {
        console.clear();
        let veterinaria : Veterinaria | null = this.seleccionarVeterinariaCliente();
        // Salir si no se seleccionó ninguna veterinaria
        if (veterinaria != null) {
            this.comprobarCliente(veterinaria);
        }
    }

    //Comprueba si el cliente existe ya o no y dependiende de eso le muestra un Menu diferente
    private comprobarCliente(veterinaria: Veterinaria) {
            console.clear();
            let dniCliente: number = rls.questionInt("Ingrese su dni: ");
            let cliente: Cliente | null = this.buscarClientePorDni(veterinaria, dniCliente);
            if (cliente !== null) {
                this.ejecutarComoCliente(cliente);
            } else {
                let opcionSeleccionada: number;
                this.mensajeOpciones("No se encontro ningun cliente con dicho Dni");
                do {
                    opcionSeleccionada = this.menuOpciones(" 1 - Crear nuevo Cliente \n 2 - Ingresar Dni nuevamente\n 3 - Volver");
                    switch (opcionSeleccionada) {
                        case 1: veterinaria.crearCliente();
                                cliente = this.buscarClientePorDni(veterinaria, dniCliente);
                                if (cliente !== null) {
                                this.ejecutarComoCliente(cliente);
                                };
                                break;
                        case 2: this.menuCliente(); break;
                        case 3: console.log("Volviendo...")
                                GestorPrograma.esperarEnter();
                                console.clear();
                                break;
                        default: console.log("Opción no válida. Por favor, intente nuevamente.");
                            GestorPrograma.esperarEnter();
                            console.clear();
                    }
                } while (opcionSeleccionada !== 3);
            }
    };

    //Comprueba si el cliente ya existe a partir de su Dni.
    public buscarClientePorDni(veterinaria: Veterinaria, dni: number): Cliente | null {
        let clienteEncontrado: Cliente | null = null;
        veterinaria.getlistaClientes().forEach(cliente => {
            if (clienteEncontrado === null && cliente.getDni() === dni) {
                clienteEncontrado = cliente;
            }
        });

        return clienteEncontrado;
    }

    // crearNuevaMascota(cliente: Cliente) {
    //     console.clear();
    //     let nombre: string = rls.question("Ingrese Nombre de su Mascota: ");
    //     let especie = rls.question("Ingrese Especie de su Mascota: ");
    //     let idPropietario = cliente.getId();

    //     const mascota: Paciente = new Paciente(nombre, especie, idPropietario);
    //     cliente.agregarMascotaALaLista(mascota);
    //     console.log("Mascota Agregada Exitosamente")
    //     GestorPrograma.esperarEnter();
    // }

    // listarMascotas(cliente: Cliente): Paciente[] | undefined {
    //     console.clear();
    //     let mascotas: Paciente[] | undefined = cliente.getMascotas();
    //     if (mascotas.length === 0) {
    //         console.log("No hay mascotas para mostrar")
    //     } else {
    //         return mascotas;
    //     }
    // }

    private gestorMascotas(cliente:Cliente):void {
        console.clear();
        let opcionSeleccionada: number;

        do {
            this.mensajeOpciones("Aqui podra Crear o Modificar Mascotas");
            opcionSeleccionada = this.menuOpciones(" 1 - Crear nueva Mascota \n 2 - Ver Lista de Mascotas\n 3 - Modificar Mascota \n 4 - Eliminar Mascota\n 5 - Volver");
            switch (opcionSeleccionada) {
                case 1: cliente.crearMascota(); break;
                case 2: cliente.listarMascotas(); break;
                case 3: cliente.modificarMascota(); break;
                case 4: cliente.eliminarMascota(); break;
                case 5: console.log("Volviendo...");
                    console.clear();
                    break;
                default: console.log("Opción no válida. Por favor, intente nuevamente.");
                    GestorPrograma.esperarEnter();
                    console.clear();
            }
        } while (opcionSeleccionada !== 5);
    };

    // Comprueba si hay clientes en la Red y permite seleccionar uno
    private seleccionarCliente( veterinaria : Veterinaria):Cliente{
        const clientes = veterinaria.getlistaClientes();
        if (clientes.length === 0) {
            console.log("No hay Clientes creados aún. Por favor, cree uno para continuar.");
            GestorPrograma.esperarEnter();
            veterinaria.crearCliente();
        }
            veterinaria.listarClientes();
        const id = rls.questionInt("Ingrese el número del Cliente que desea seleccionar: ") - 1;

        if (id < 0 || id >= clientes.length) {
            console.log("Número inválido. Regresando al menú principal.");
            GestorPrograma.esperarEnter();
        }

        const cliente = clientes[id];
        console.log(`Cliente seleccionado: ${cliente.getNombre()} dni: (${cliente.getDni()})`);
        GestorPrograma.esperarEnter();
        return cliente;
    }



    //Funcion que Recibe mensaje y Opciones disponibles
    private menuOpciones(mensaje: string): number {
        let opcionSeleccionada: number;
        console.log(mensaje);
        opcionSeleccionada = rls.questionInt("Ingrese la Opcion que Desee: ");
        console.clear();
        return opcionSeleccionada;
    }
    //Funcion para personalizar el mensaje de Opciones
    private mensajeOpciones(mensaje: string): void {
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


