export class Notificacion {

    constructor(
        public codigo: number,
        public nombre: string,
        public asunto: string,
        public fecha_asunto: Date,
        public fecha_publicacion: Date,
        public visto: Boolean
    ) { }

}
