import { Actividad } from './actividad';
export class Usuario {
  constructor(
    public nombre: string,
    public username: string,
    public password: string,
    public telefono: number,
    public correo: string,
    public habilitado: Boolean,
    public esSuper: Boolean, 
    public fecha_inicio: Date,
    public fecha_fin: Date,
    public actividades: Actividad
  ){}
}
