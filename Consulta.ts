import * as rls from 'readline-sync';
import {Cliente} from "./Clientes";
import {Paciente} from "./Paciente";

export class Consulta {
    private id:string;
    private cliente:Cliente;
    private mascota:Paciente;
    private motivo:string="";
    private precio:number;

    constructor (cliente:Cliente, mascota:Paciente){
        this.cliente = cliente;
        this.mascota = mascota;
        this.id = Consulta.incrementarId();
        this.precio = 5000;
    }
    
    static idActual = 0;
    
    static incrementarId(): string {
      return (++this.idActual).toString();
    }

    //Getters y Setters
    public setMotivo(motivo:string):void{
        this.motivo = motivo;
    }

    public getMotivo():string{
        return this.motivo;
    }

    public setPrecio(precio:number):void{
        this.precio = precio;
    }

    public getPrecio():number{
        return this.precio;
    }

    public agregarMotivo():string{
        const consulta : string = rls.question("Ingrese el motivo de su consulta: ");
        this.setMotivo(consulta);
        return consulta;
    }

    public calcularPrecio():number{
        if (!this.cliente.isEsVIP()){
            return this.getPrecio();
        }else{
            return (this.getPrecio()*0.9);
        }
    }
}