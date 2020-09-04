export class NotificacionMensajeDto {
    public _id: string;
    public displayName: string;
    public picture: string;
    public titulo: string;
    public mensaje: string;
    public idPersona: string;
    public tipoNotificacon: number;
    public portada: string;
    public idSegmento: string;
    public nombreSegmentro: string;
    public like: boolean;

    constructor(id: string, displayName: string, picture: string, titulo: string, mensaje: string,
                idPersona: string, tipoNotificacon: number, portada: string,
                idSegmento: string, nombreSegmentro: string, like: boolean) {
        this._id = id;
        this.displayName = displayName;
        this.picture = picture;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.idPersona = idPersona;
        this.tipoNotificacon = tipoNotificacon;
        this.portada = portada;
        this.idSegmento = idSegmento;
        this.nombreSegmentro = nombreSegmentro;
        this.like = like;
    }
}

export interface RespuestaPosts {
    ok: boolean;
    pagina: number;
    posts: Post[];
}

export interface Post {
    imgs?: string[];
    _id?: string;
    mensaje?: string;
    coords?: string;
    usuario?: Usuario;
    created?: string;
}

export interface Usuario {
    avatar?: string;
    _id?: string;
    nombre?: string;
    email?: string;
    password?: string;
}


export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
}
