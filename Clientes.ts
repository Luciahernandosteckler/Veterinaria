export class Cliente {
  private id: string;
  private nombre: string;
  private telefono: number;
  private numeroVisitas: number = 0;
  private esVIP: boolean = false;

  constructor(id: string, nombre: string, telefono: number) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
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
}
