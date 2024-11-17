export class Paciente {
  private id: string;
  private nombre: string;
  private especie: string;
  private idPropietario: string;

  constructor(
    nombre: string,
    especie: string,
    idPropietario: string
  ) {
    this.id = Paciente.incrementarId();
    this.nombre = nombre;
    this.especie = especie;
    this.idPropietario = idPropietario;
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

  public getEspecie(): string {
    return this.especie;
  }

  public setEspecie(especie: string): void {
    this.especie = especie;
  }

  public getIdPropietario(): string {
    return this.idPropietario;
  }

  public setIdPropietario(idPropietario: string): void {
    this.idPropietario = idPropietario;
  }
}
