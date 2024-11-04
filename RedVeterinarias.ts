// RedVeterinarias.ts

export class Veterinaria {
    constructor(public id: string, public nombre: string, public direccion: string) {}
}

export class Cliente {
    constructor(public id: string, public nombre: string, public telefono: string, public numeroVisitas: number = 0) {
        this.esVip = this.numeroVisitas >= 5;
    }

    esVip: boolean;

    incrementarVisitas() {
        this.numeroVisitas++;
        this.esVip = this.numeroVisitas >= 5;
    }
}

export class Paciente {
    constructor(public id: string, public nombre: string, public especie: string, public idPropietario: string) {}
}

export class Proveedor {
    constructor(public id: string, public nombre: string, public contacto: string) {}
}

export class RedVeterinarias {
    private veterinarias: Veterinaria[] = [];
    private clientes: Cliente[] = [];
    private pacientes: Paciente[] = [];
    private proveedores: Proveedor[] = [];

     // Método para obtener la lista de clientes
     obtenerClientes(): Cliente[] {
        return this.clientes;
    }

    agregarVeterinaria(veterinaria: Veterinaria): void {
        this.veterinarias.push(veterinaria);
    }

    agregarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    agregarPaciente(paciente: Paciente): void {
        const existe = this.pacientes.some(pac => pac.id === paciente.id);
        if (!existe) {
            this.pacientes.push(paciente);
        } else {
            console.log(`El paciente ${paciente.nombre} ya existe.`);
        }
    }

    agregarProveedor(proveedor: Proveedor): void {
        this.proveedores.push(proveedor);
    }

    modificarCliente(id: string, nuevosDatos: Partial<Cliente>): void {
        const cliente = this.clientes.find(cli => cli.id === id);
        if (cliente) {
            Object.assign(cliente, nuevosDatos);
        }
    }

    eliminarCliente(id: string): void {
        this.clientes = this.clientes.filter(cli => cli.id !== id);
    }

    eliminarVeterinaria(id: string): void {
        this.veterinarias = this.veterinarias.filter(vet => vet.id !== id);
    }

}
