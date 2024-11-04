class Cliente {
    id: string;
    nombre: string;
    telefono: string;
    esVIP: boolean;

    constructor(id: string, nombre: string, telefono: string, esVIP: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.esVIP = esVIP;
    }
}
