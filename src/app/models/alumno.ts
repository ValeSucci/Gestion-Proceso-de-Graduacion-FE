import { AltaMateria } from './alta-materia';

export class Alumno {
  constructor(
    public codigo: number,
    public nombre: string,
    public alta_materia: AltaMateria[]
  ){}
}
