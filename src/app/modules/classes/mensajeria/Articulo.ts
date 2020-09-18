import {ArticuloSegmento} from './articulo-segmento';

export class Articulo {
    public _id: string;
    public descripcion: string;
    public unidadAlmacenada: number;
    public unidadCosto: number;
    public articuloSegmento: string;
    public estado: number;
    public portada: string;
    public esServicio: false;
    public permiteComentar: false;
    public ocultarBotonSolicitar: false;
    public esBanner: false;
    public imgs?: string[];
    public conteoLike = 0;
    public conteoDisLike = 0;
    public conteoComentarios = 0;
    public verObservacion: false;
    public obsevacion: string;
}


export class ObjetoArticulo {
    public _id: string;
    public descripcion: string;
    public unidadAlmacenada: number;
    public unidadCosto: number;
    public articuloSegmento: ArticuloSegmento = new ArticuloSegmento();
    public estado: number;
    public portada: string;
    public esServicio: false;
    public permiteComentar: false;
    public ocultarBotonSolicitar: false;
    public esBanner: false;
    public imgs?: string[];
    public conteoLike = 0;
    public conteoDisLike = 0;
    public conteoComentarios = 0;
    public verObservacion: false;
    public obsevacion: string;
    public horaInicio: Date;
    public horaFin: Date;
}
