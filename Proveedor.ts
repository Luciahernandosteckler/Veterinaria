export class Proveedor {
  private id: string;
  private nombre: string;
  private contacto: string;

  constructor(id: string, nombre: string, contacto: string) {
    this.id = id;
    this.nombre = nombre;
    this.contacto = contacto;
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
