import { Docente } from './docente';
import { Carta } from './carta';
export class AltaMateria {
  constructor(
    public nro_alta: number,
    public semestre: string,
    public fecha: Date,
    public plazo: Date,
    public prorroga: Boolean,
    public estado: {
      est: string,
      color: string
    },
    public modalidad: {
      mod: string,
      trabDirig: {
          empresa: string,
          fecha_suficiencia: Date
      }
    },
    public tema: string,
    public observaciones: string,
    public tutor: {
//        doc: Docente,
        doc: string,
        fecha_asignacion: Date,
        cite_carta: string,
        ubicacion_carta: Carta,
        fecha_suficiencia: Date,
        paga: Boolean
    },
    public revisor: {
       //doc: Docente,
        doc: string,
        fecha_asignacion: Date,
        cite_carta: string,
        ubicacion_carta: Carta,
        fecha_suficiencia: Date,
    },
    public defensa_interna: {
        fecha: Date,
        resultado: string,
        observacion: string
    },
    public defensa_externa: {
        fecha: Date,
        presidente: string,
        evaluador1: string,
        evaluador2: string,
        resultado: string
    }
  ){}
}
