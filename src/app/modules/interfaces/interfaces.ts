export class NotificacionMensajeDto {
    public _id: string;
    public displayName: string;
    public picture: string;
    public titulo: string;
    public mensaje: string;
    public playerId: string;
    public tipoNotificacon: number;
    public portada: string;
    public idSegmento: string;
    public nombreSegmento: string;
    public like: boolean;
    public esServicio: boolean;
    public created: Date;


    constructor(id: string, displayName: string, picture: string, titulo: string, mensaje: string,
                playerId: string, tipoNotificacon: number, portada: string,
                idSegmento: string, nombreSegmento: string, like: boolean, esServicio: boolean, created: Date) {
        this._id = id;
        this.displayName = displayName;
        this.picture = picture;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.playerId = playerId;
        this.tipoNotificacon = tipoNotificacon;
        this.portada = portada;
        this.idSegmento = idSegmento;
        this.nombreSegmento = nombreSegmento;
        this.like = like;
        this.esServicio = esServicio;
        this.created = created;
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
