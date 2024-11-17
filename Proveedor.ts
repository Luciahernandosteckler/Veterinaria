export class Proveedor {
  private id: string;
  private nombre: string;
  private contacto: string;

  constructor(nombre: string, contacto: string) {
    this.id = Proveedor.incrementarId();
    this.nombre = nombre;
    this.contacto = contacto;
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

  public getContacto(): string {
    return this.contacto;
  }

  public setContacto(contacto: string): void {
    this.contacto = contacto;
  }
}
