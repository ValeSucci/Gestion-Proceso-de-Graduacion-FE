import { Docente } from './docente';
import { Carta } from './carta';
export class AltaMateria {
  constructor(
    nro_alta: number,
    semestre: string,
    fecha: Date,
    plazo: Date,
    prorroga: Boolean,
    estado: {
      est: string,
      color: string
    },
    modalidad: {
      mod: string,
      trabDirig: {
          empresa: string,
          fecha_suficiencia: Date
      }
    },
    tema: string,
    observaciones: string,
    tutor: {
//        doc: Docente,
        doc: string,
        fecha_asignacion: Date,
        cite_carta: string,
        ubicacion_carta: Carta,
        fecha_suficiencia: Date,
        paga: Boolean
    },
    revisor: {
//        doc: Docente,
        doc: string,
        fecha_asignacion: Date,
        cite_carta: string,
        ubicacion_carta: Carta,
        fecha_suficiencia: Date,
    },
    defensa_interna: {
        fecha: Date,
        resultado: string,
        observacion: string
    },
    defensa_externa: {
        fecha: Date,
        presidente: string,
        evaluador1: string,
        evaluador2: string,
        resultado: Boolean
    }
  ){}
}
